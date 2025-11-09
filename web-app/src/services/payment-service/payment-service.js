import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import amqp from 'amqplib';
import { Eureka } from 'eureka-js-client';
import config from './config.json' assert { type: 'json' };

const app = express();
app.use(express.json());
const PORT = config.ports.paymentService;

// EUREKA CLIENT
const eurekaClient = new Eureka({
  instance: {
    app: 'payment-services',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: { '$': PORT, '@enabled': true },
    vipAddress: 'payment-services',
    dataCenterInfo: { '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo', name: 'MyOwn' },
  },
  eureka: {
    host: config.eureka.host,
    port: config.eureka.port,
    servicePath: config.eureka.servicePath,
  },
});

mongoose.connect(config.paymentDb.connectionString).then(() => console.log('PaymentDB Connected'));

// RABBITMQ PUBLISHER
let channel;
async function connectQueue() {
  try {
    const connection = await amqp.connect(config.messageBroker.url);
    channel = await connection.createChannel();
    await channel.assertQueue(config.messageBroker.paymentQueue, { durable: true });
    console.log('RabbitMQ Publisher is ready in PaymentService');
  } catch (error) { console.error('RabbitMQ Connection Error:', error); }
}

async function publishPaymentEvent(payload) {
  if (channel) {
    channel.sendToQueue(config.messageBroker.paymentQueue, Buffer.from(JSON.stringify(payload)), { persistent: true });
  }
}

const PaymentLogSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number },
  status: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' },
  gatewayTxnRef: { type: String, unique: true },
}, { timestamps: true });
const PaymentLog = mongoose.model('PaymentLog', PaymentLogSchema);

app.post('/create-payment-request', async (req, res) => {
  try {
    const { orderId, amount, orderInfo, userId } = req.body;
    const gatewayTxnRef = `${orderId}_${Date.now()}`;
    await new PaymentLog({ orderId, userId, amount, gatewayTxnRef, status: 'PENDING' }).save();
    
    // GIẢ LẬP TẠO QR
    const qrImageUrl = `https://api.vietqr.io/image/${config.sepay.bankBin}-${config.sepay.accountNo}-VND-${amount}-Thanh toan ${gatewayTxnRef}.png`;
    res.json({ paymentUrl: qrImageUrl });
  } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.post('/sepay_webhook', async (req, res) => {
  try {
    // TODO: THÊM LOGIC XÁC THỰC WEBHOOK TỪ SEPAY
    const { order_id, status } = req.body;
    const paymentLog = await PaymentLog.findOne({ gatewayTxnRef: order_id });
    if (!paymentLog || paymentLog.status !== 'PENDING') {
      return res.json({ message: 'Order invalid or already processed' });
    }
    if (status === 'SUCCESS') {
      paymentLog.status = 'PAID';
      await paymentLog.save();
      await publishPaymentEvent({ type: 'PAYMENT_COMPLETED', orderId: paymentLog.orderId });
    } else {
      paymentLog.status = 'FAILED';
      await paymentLog.save();
    }
    res.json({ message: 'Webhook received' });
  } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

app.listen(PORT, () => {
  console.log(`PaymentService đang chạy trên cổng ${PORT}`);
  connectQueue();
  eurekaClient.start();
});