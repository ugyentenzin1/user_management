const express = require('express')
const cors = require('cors')  // Add this line
const port = 2000;
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}));

const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active', joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-01-25' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'User', status: 'Inactive', joinDate: '2024-02-01' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'User', status: 'Pending', joinDate: '2024-02-05' },
    { id: 6, name: 'Diana Davis', email: 'diana.davis@example.com', role: 'Admin', status: 'Active', joinDate: '2024-02-10' },
    { id: 7, name: 'Edward Miller', email: 'edward.miller@example.com', role: 'User', status: 'Active', joinDate: '2024-02-15' },
    { id: 8, name: 'Fiona Garcia', email: 'fiona.garcia@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-02-20' },
    { id: 9, name: 'George Taylor', email: 'george.taylor@example.com', role: 'User', status: 'Inactive', joinDate: '2024-02-25' },
    { id: 10, name: 'Helen Anderson', email: 'helen.anderson@example.com', role: 'User', status: 'Pending', joinDate: '2024-03-01' },
];

app.get('/users', (req, res) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});

app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id));
    const newUsers = users.filter(val => val.id !== user.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(newUsers);
});

app.listen(port, () => {
    console.log(users)
    console.log(`Example app listening on port ${port}`)
})