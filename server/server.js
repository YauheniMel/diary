const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const port = 3000;
const app = express();

app.use(express.json());

let imageName;

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/publick-foto');
  },
  filename: (req, file, cb) => {
    imageName = file.originalname;
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

const baseURL = path.join(__dirname, '../');
const dataUrl = path.resolve(baseURL, 'data', 'data.json');

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(baseURL, 'dist', 'index.html'));
});

app.get('/api/data', (req, res) => {
  let data;

  fs.readFile(dataUrl, (err, obj) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      data = JSON.parse(obj);
    }

    res.status(200).json(data);
  });
});

app.post('/api/data', upload.single('picture'), (req, res) => {
  let newArrPost;

  fs.readFile(dataUrl, (err, data) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      const arrPost = JSON.parse(data);

      req.body.imageName = imageName;

      newArrPost = JSON.stringify([...arrPost, req.body]);

      fs.writeFile(dataUrl, newArrPost, (err) => {
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
