import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const users = []; // This will act as a temporary in-memory user store

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);
    
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ username, password });
    return res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});