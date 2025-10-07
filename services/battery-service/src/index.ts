import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let batteryInventory = [];

// Get all batteries
app.get('/api/batteries', (req, res) => {
    res.json(batteryInventory);
});

// Add a new battery
app.post('/api/batteries', (req, res) => {
    const newBattery = req.body;
    batteryInventory.push(newBattery);
    res.status(201).json(newBattery);
});

// Update a battery
app.put('/api/batteries/:id', (req, res) => {
    const { id } = req.params;
    const index = batteryInventory.findIndex(battery => battery.id === id);
    if (index !== -1) {
        batteryInventory[index] = { ...batteryInventory[index], ...req.body };
        res.json(batteryInventory[index]);
    } else {
        res.status(404).send('Battery not found');
    }
});

// Delete a battery
app.delete('/api/batteries/:id', (req, res) => {
    const { id } = req.params;
    batteryInventory = batteryInventory.filter(battery => battery.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Battery service running at http://localhost:${port}`);
});