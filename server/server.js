const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Contains file info
  res.send('File uploaded successfully');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

app.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Unable to scan directory');
      }
  
      res.send(files);
    });
  });