const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'treehack',
    password: 'treehacks',
    port: 5432,
});

const fs = require('fs');
const chokidar = require('chokidar');

const watcher = chokidar.watch('uploads', { persistent: true });

watcher.on('add', path => {
    console.log(`File ${path} has been added`);
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const suspiciousEditDetails = jsonData.suspiciousEditDetails;

            // Assuming suspiciousEditDetails is an array of objects
            if (Array.isArray(suspiciousEditDetails)) {
                suspiciousEditDetails.forEach(detail => {
                    const query = `
            INSERT INTO json_data(
              startTimeStamp, 
              endTimeStamp, 
              contentLength, 
              text, 
              lineNumber, 
              fileName, 
              hash,
              username
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (hash) DO NOTHING;`; // Assuming hash is unique and primary key, ignore duplicates
                    const values = [
                        detail.startTimeStamp,
                        detail.endTimeStamp,
                        detail.contentLength,
                        detail.text,
                        detail.lineNumber,
                        detail.fileName,
                        detail.hash,
                        detail.username
                    ];

                    pool.query(query, values, (err, res) => {
                        if (err) {
                            console.error('Error inserting data:', err.stack);
                        } else {
                            console.log('Inserted detail into database:', detail);
                        }
                    });
                });
            } else {
                console.log('suspiciousEditDetails is not an array or is missing');
            }
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
});


watcher.on('add', path => {
    console.log(`File ${path} has been added (second version)`);
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const normalEditDetails = jsonData.normalEditDetails;

            // Assuming normalEditDetails is an array of objects
            if (Array.isArray(normalEditDetails)) {
                normalEditDetails.forEach(detail => {
                    const query = `
            INSERT INTO json_data_non_sus(
              startTimeStamp, 
              endTimeStamp, 
              contentLength, 
              action,
              suspicious,
              text, 
              lineNumber, 
              fileName, 
              hash,
              username
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (hash) DO NOTHING;`; // Assuming hash is unique and primary key, ignore duplicates
                    const values = [
                        detail.startTimeStamp,
                        detail.endTimeStamp,
                        detail.contentLength,
                        detail.action,
                        detail.suspicious,
                        detail.text,
                        detail.lineNumber,
                        detail.fileName,
                        detail.hash,
                        detail.username
                    ];
                    pool.query(query, values, (err, res) => {
                        if (err) {
                            console.error('Error inserting data:', err.stack);
                        } else {
                            console.log('Inserted detail into database:', detail);
                        }
                    });
                });
            } else {
                console.log('suspiciousEditDetails is not an array or is missing');
            }
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
});

// New watcher for user edit summary
watcher.on('add', path => {
    console.log(`File ${path} has been added for summary statistics`);
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            // Extracting username and summary statistics
            const { username, totalEdits, totalLinesEdited, suspiciousEdits, averageTypingSpeed } = jsonData;

            const query = `
                INSERT INTO user_edit_summary(
                  username,
                  totalEdits,
                  totalLinesEdited,
                  suspiciousEdits,
                  averageTypingSpeed
                ) VALUES($1, $2, $3, $4, $5)
                ON CONFLICT (username) DO NOTHING;`;
            const values = [
                username,
                totalEdits,
                totalLinesEdited,
                suspiciousEdits,
                averageTypingSpeed
            ];

            pool.query(query, values, (err, res) => {
                if (err) {
                    console.error('Error inserting user edit summary:', err.stack);
                } else {
                    console.log(`Inserted summary statistics for user: ${username}`);
                }
            });

        } catch (parseErr) {
            console.error('Error parsing JSON for summary statistics:', parseErr);
        }
    });
});