const express = require('express');
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/test", (req,res)=>{
  res.send("hello gcp");
})

// Handle the incoming webhook request
app.post('/', (req, res) => {
  const payload = req.body; // The payload received from GHL
  console.log("payload: ", payload);
  forwardPayloadToCapri(payload)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error forwarding payload to Capri:', error);
      res.sendStatus(200);
    });
});

app.listen(port, () => {
  console.log(`Gateway server is running on port ${port}`);
});

// Function to forward the payload
async function forwardPayloadToCapri(payload) {
  try {
    const capriUrl = 'https://systems.capriai.us/gpt3'; 

    await axios.post(capriUrl, payload);

    console.log('Payload forwarded to Capri successfully');
  } catch (error) {
    console.error('Error forwarding payload to Capri:', error);
    throw error;
  }
}