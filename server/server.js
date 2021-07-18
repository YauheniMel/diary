const express = require('express');
const path = require('path');

const app = express();
const baseURL = path.join(__dirname, '../');

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(baseURL, 'dist', 'index.html'));
});

app.use(express.static(path.join(baseURL, 'dist')));

app.listen(3000, () => {
  console.log('Server started!...');
});
