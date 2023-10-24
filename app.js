const express = require('express');
const multer = require('multer');
const db = require('./db');
const path = require('path');

const app = express();
const port = 3000;

// Set up the file storage destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        db.any('INSERT INTO advertistment(name, path, deleted, created_at)VALUES ('+"'"+req.file.filename+"'"+', '+"'"+req.file.path+"'"+', 0, now());')
            .then((data) => {
                console.log('Data:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        res.send('File uploaded!');
    } else {
        res.send('No file selected.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});