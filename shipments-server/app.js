const shipments = require('./Shipments.json');
const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON in requests
app.use(express.json());

// GET endpoint to retrieve all shipments
app.get('/shipments', (req, res) => {
  res.json(shipments);
});

// GET endpoint to retrieve a single shipment object by ID
app.get('/shipments/:orderNo', (req, res) => {
  const { orderNo } = req.params;
  const shipment = shipments.find((d) => d.orderNo === orderNo);

  if (!shipment) {
    res.status(404).send('Shipment not found');
  } else {
    res.json(shipment);
  }
});

// DELETE endpoint to delete a single shipment object by ID
app.delete('/shipments/:orderNo', (req, res) => {
  const { orderNo } = req.params;
  const index = shipments.findIndex((d) => d.orderNo === orderNo);

  if (index === -1) {
    res.status(404).send('Shipment not found');
  } else {
    shipments.splice(index, 1);
    res.sendStatus(204);
  }
});

// PUT endpoint to update a single shipment object by ID (orderNo)
app.put('/shipments/:orderNo', (req, res) => {
  const { orderNo } = req.params;
  const shipment = shipments.find((d) => d.orderNo === orderNo);
  console.log('bef', shipment, 'req', req.body);
  if (!shipment) {
    res.status(404).send('Shipment not found');
  } else {
    // Update shipment object with request body data
    Object.assign(shipment, req.body);
    console.log('aft', shipment);
    fs.writeFile('shipments.json', JSON.stringify(shipments), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing to file');
      } else {
        res.json(shipment);
      }
    })
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
