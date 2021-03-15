var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(fileUpload({ debug: true }));

app.listen(PORT, () => {
  console.log(`[SERVER] Running at ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server Home');
});

app.post('/upload', (req, res) => {
  let uploadPath;
  let myImage;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  myImage = req.files.myImage;
  uploadPath = __dirname + '/static/' + myImage.name;

  myImage.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('Image uploaded.');
  });
});
