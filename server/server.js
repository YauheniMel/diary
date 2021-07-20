const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'publick-foto' });

const port = 3000;
const app = express();

const baseURL = path.join(__dirname, '../');
const dataUrl = path.resolve(baseURL, 'data', 'data.json');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(baseURL, 'dist', 'index.html'));
});

app.post('/api/data', upload.single('picture'), (req, res) => {
  let newData;

  console.log(req.body);
  console.log(req.file);

  fs.readFile(dataUrl, (err, data) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      const jsonToArr = JSON.parse(data);

      newData = JSON.stringify([...jsonToArr, req.body]);

      fs.writeFile(dataUrl, newData, (err) => {
        if (err) {
          console.log(err.message);
          throw err;
        }
      });
    }
  });
});

app.use(express.static(path.join(baseURL, 'dist')));

app.listen(port, () => {
  console.log('Server started!...');
});
