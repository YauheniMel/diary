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
    cb(null, 'public/photo');
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      imageName = +new Date() + file.originalname.match(/.[\w]+$/g, '');

      cb(null, imageName);
    }
  },
});

const upload = multer({ storage: storageConfig });

const baseURL = path.join(__dirname, '../');

app.use(express.static(path.join(`${baseURL}public`)));
app.use(express.static(path.join(`${baseURL}dist`)));

const dataUrl = path.resolve(baseURL, 'public', 'data');
const photoUrl = path.resolve(baseURL, 'public', 'photo');

if (!fs.existsSync(`${baseURL}public`)) {
  fs.mkdirSync(dataUrl, { recursive: true });
  fs.mkdirSync(photoUrl, { recursive: true });
  fs.writeFileSync(`${dataUrl}/data.json`, '[]');
}

const jsonURL = `${dataUrl}/data.json`;

app.get('/api/data', (req, res) => {
  fs.readFile(jsonURL, (err, obj) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      res.status(200).send(obj);
    }
  });
});

app.post('/api/data', upload.single('picture'), (req, res) => {
  fs.readFile(jsonURL, (err, data) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      const allData = JSON.parse(data);

      req.body.imageName = imageName;
      req.body.id = +imageName.match(/[\d]+/gim)[0];

      imageName = null;

      const newData = JSON.stringify([...allData, req.body]);

      fs.writeFile(jsonURL, newData, (err) => {
        if (err) {
          console.log(err.message);
          throw err;
        }
      });
    }
  });
});

app.delete('/api/data/:id', (req, res) => {
  fs.readFile(jsonURL, (err, data) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      const jsonToArr = JSON.parse(data);

      const newData = jsonToArr.filter((item) => {
        if (item.id == req.params.id) {
          fs.unlink(`${photoUrl}/${item.imageName}`, (err) => {
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

      fs.writeFile(jsonURL, JSON.stringify(newData), (err) => {
        if (err) {
          console.log(err.message);
          throw err;
        }
      });
    }
  });
});

app.put('/api/data/:id', upload.single('picture'), (req, res) => {
  fs.readFile(jsonURL, (err, data) => {
    if (err) {
      console.log(err.message);
      throw err;
    } else {
      const jsonToArr = JSON.parse(data);

      const newData = jsonToArr.map((obj) => {
        if (obj.id == req.params.id) {
          for (const key in obj) {
            if (req.body[key]) {
              obj[key] = req.body[key];
            }
          }

          if (imageName) {
            fs.unlink(`${photoUrl}/${obj.imageName}`, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`File ${obj.imageName} was update!...`);
              }
            });

            obj.imageName = imageName;

            imageName = null;
          }
        }

        return obj;
      });

      fs.writeFile(jsonURL, JSON.stringify(newData), (err) => {
        if (err) {
          console.log(err.message);
          throw err;
        }
      });
    }
  });
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(baseURL, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log('Server started!...');
});
