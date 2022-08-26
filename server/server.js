const express = require('express');
const app = express();
const port = 8000;

app.get('/hi', (req, res) => {
  res.status(200).json({status: 200, message: "Hello bb"})
})

app.listen(port, () => {
  console.log(`🪴 Listening on port ${port}🪴`)
})