const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome bro');
})

app.listen('8080', () => {
  console.log('app i running on port 8080');
})