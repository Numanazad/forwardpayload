const express = require('express');
const axios = require("axios");
const app = express();
const port = 3000; // Choose a port number of your choice

app.use(express.json());

// Handle the incoming webhook request
app.post('/webhook', (req, res) => {
  // Process the request payload and forward it to Capri
  const payload = req.body; // The payload received from GHL
  console.log("payload", payload);
  return false;
  // Forward the transformed payload to Capri
  forwardPayloadToCapri(payload)
    .then(() => {
      res.sendStatus(200); // Respond with a success status
    })
    .catch((error) => {
      console.error('Error forwarding payload to Capri:', error);
      res.sendStatus(500); // Respond with an error status
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Gateway server is running on port ${port}`);
});

// Function to forward the payload to Capri
async function forwardPayloadToCapri(payload) {
  try {
    const capriUrl = 'https://systems.capriai.us/gpt3'; // Replace with the actual Capri URL

    // Make a request to Capri with the transformed payload
    await axios.post(capriUrl, payload);

    console.log('Payload forwarded to Capri successfully');
  } catch (error) {
    console.error('Error forwarding payload to Capri:', error);
    throw error;
  }
}