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
    cb(null, 'dist/publick/foto');
  },
  filename: (req, file, cb) => {
    imageName = file.originalname;
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

const baseURL = path.join(__dirname, '../');
const dataUrl = path.resolve(baseURL, 'dist', 'publick', 'data', 'data.json');
const fotoUrl = path.resolve(baseURL, 'dist', 'publick', 'foto');

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
      req.body.id = +new Date();

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

app.delete('/api/data/:id', (req, res) => {
  res.status(200).json({ message: 'Успешное удаление!' });

  fs.readFile(dataUrl, (err, data) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      const jsonToArr = JSON.parse(data);

      newData = jsonToArr.filter((item) => {
        if (item.id == req.params.id) {
          fs.unlink(`${fotoUrl}/${item.imageName}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`File ${item.imageName} was deleted!...`);
            }
          });
        }

        if (item.id != req.params.id) {
          return item;
        }
      });

      fs.writeFile(dataUrl, JSON.stringify(newData), (err) => {
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
