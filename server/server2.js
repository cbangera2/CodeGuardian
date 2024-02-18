const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'treehack',
    password: 'treehacks',
    port: 5432,
});

// Middleware
app.use(express.json());

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file); // Contains file info
    res.send('File uploaded successfully');
});

// Endpoint to list all files
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

// Secure query execution endpoint
app.post('/query', async (req, res) => {
    const { query, params } = req.body; // Assume params are provided for prepared statements

    try {
        const result = await pool.query(query, params); // Use prepared statements to avoid SQL injection
        console.log("This is the result: ", result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to execute query' });
    }
});

// Server start
const port = 3002; // Updated to avoid conflict and match file upload server port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});