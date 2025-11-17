import { Client } from 'pg';
import express, { json } from 'express';
const app = express();
import cors from 'cors';  // Add this line
const port = 2000;
const client = new Client({
    user: 'ugyentenzin',
    host: 'localhost',
    database: 'my_database',
    password: '',
    port: 5432,
});

// Connect to database
client.connect().catch(err => console.error('Connection error', err));

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(json());
app.use((req, res, next) => {
    const start = Date.now();

    console.log(`➡️  ${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("📥 Request Body:", req.body);
    }

    // Capture the original send
    const originalSend = res.send;

    res.send = function (data) {
        console.log(`⬅️  Status: ${res.statusCode}`);
        console.log("📤 Response Body:", data);
        console.log(`⏱️ ${Date.now() - start}ms`);

        return originalSend.apply(res, arguments);
    };

    next();
});

let users = [];

app.get('/users', async (req, res) => {
    try {
        const fetchedUsers = await client.query('SELECT * FROM users');
        res.status(200).json(fetchedUsers.rows);
    } catch (error) {
        console.log('Error in /users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const fetchedUsers = await client.query('SELECT * FROM users');
    const user = fetchedUsers.rows.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});

app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const fetchedUsers = client.query(`DELETE FROM users WHERE id = ${id}`);
    res.status(200).json({ message: 'User deleted successfully' });
});

// Add POST route for creating users
app.post('/users', async (req, res, next) => {
    try {
        const { name, email, role, status } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const result = await client.query(
            `INSERT INTO users (name, email, role, status, join_date)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name.trim(), email.trim(), role || 'User', status || 'Active', new Date().toISOString().split('T')[0]]
          );
        res.status(201).json(result.rows);
    } catch (error) {
        next(error);
    }
});

app.put('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role, status } = req.body;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
    user.email = email;
    user.role = role;
    user.status = status;
    res.status(200).json(user);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})