import express from 'express';
import { StationController } from './controllers/stationController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const stationController = new StationController();

app.get('/stations', stationController.getAllStations);
app.post('/stations', stationController.createStation);
app.get('/stations/:id', stationController.getStationById);
app.put('/stations/:id', stationController.updateStation);
app.delete('/stations/:id', stationController.deleteStation);

app.listen(PORT, () => {
  console.log(`Station service is running on port ${PORT}`);
});