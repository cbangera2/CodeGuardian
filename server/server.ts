import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3002; // Different from React's port

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'treehack',
    password: 'treehacks',
    port: 5432,
});

app.post('/query', async (req: Request, res: Response) => {
    const { query } = req.body; // Directly using the client's query is insecure
    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to execute query' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
