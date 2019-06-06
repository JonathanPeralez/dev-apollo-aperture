// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer'); // File handler
const formidable = require('formidable');
const fs = require('fs');
const getFile = require('./ast/getFiles');
const glob = require('glob');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200,
// };

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

// filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }

// let upload = multer({ storage: storage }).single('file');
const upload = multer({storage});

/*app.post('/api/upload', upload.single('test'), (req, res, next) => {
  /!*const file = req.file;
  if (!file) {
    console.log('err');
  }*!/
  console.log('ran');
});*/

app.post('/api/upload', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) console.log(err);
    console.log(files);
    const filePath = path.join(__dirname, 'uploads');
    fs.writeFileSync()
  })
})

// app.post('/upload',function(req, res) {
//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)
//
//   })
// });
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on Port 3000')
});

function processAST(file) {
  return new Promise((resolve, reject) => {
    getFile.fileToUpload(file)
      .then(data => {
        console.log('got data', data);
        resolve(data);
      })
      .catch(err => {
        console.log('received err', err);
        reject(err);
      });
  });
}

const pathName = path.join(__dirname, '..', 'server', 'samples', 'todo', 'App.js');
fs.readFile(pathName, 'utf8', (err, file) => {
  /*getFile.fileToUpload(file)
    .then(data => {
      console.log('got data', data);
    })
    .catch(err => {
      console.log('received err', err);
    });*/
});

module.exports = app;
