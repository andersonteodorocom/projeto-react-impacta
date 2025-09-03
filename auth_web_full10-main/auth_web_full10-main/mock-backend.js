// Mock Backend Simples para Teste
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3030;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mock
let users = [
    { id: 1, name: 'Admin', username: 'admin', password: 'admin', roles: ['admin'] },
    { id: 2, name: 'Usuário Teste', username: 'user', password: 'user', roles: ['user'] },
    { id: 3, name: 'Editor Admin', username: 'editor', password: 'editor', roles: ['editor', 'admin'] }
];

let roles = [
    { id: 1, name: 'admin', description: 'Administrador do sistema' },
    { id: 2, name: 'user', description: 'Usuário comum' },
    { id: 3, name: 'editor', description: 'Editor de conteúdo' }
];

let nextUserId = 3;
let nextRoleId = 4;

// Auth endpoints
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json({
            ...userWithoutPassword,
            token: 'mock-token-' + user.id
        });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

// User endpoints
app.get('/users', (req, res) => {
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPassword);
});

app.post('/users', (req, res) => {
    const { name, username, password } = req.body;
    
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username já existe' });
    }
    
    const newUser = {
        id: nextUserId++,
        name,
        username,
        password,
        roles: []
    };
    
    users.push(newUser);
    res.status(201).json({ success: true });
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const { name, username, roles } = req.body;
    users[userIndex] = { ...users[userIndex], name, username, roles };
    res.json({ success: true });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    users.splice(userIndex, 1);
    res.json({ success: true });
});

// Role endpoints
app.get('/roles', (req, res) => {
    res.json(roles);
});

app.post('/roles', (req, res) => {
    const { name, description } = req.body;
    
    if (roles.find(r => r.name === name)) {
        return res.status(400).json({ error: 'Nome da role já existe' });
    }
    
    const newRole = {
        id: nextRoleId++,
        name,
        description
    };
    
    roles.push(newRole);
    res.status(201).json({ success: true });
});

app.get('/roles/:id', (req, res) => {
    const role = roles.find(r => r.id === parseInt(req.params.id));
    if (role) {
        res.json(role);
    } else {
        res.status(404).json({ error: 'Role não encontrada' });
    }
});

app.put('/roles/:id', (req, res) => {
    const roleId = parseInt(req.params.id);
    const roleIndex = roles.findIndex(r => r.id === roleId);
    
    if (roleIndex === -1) {
        return res.status(404).json({ error: 'Role não encontrada' });
    }
    
    const { name, description } = req.body;
    roles[roleIndex] = { ...roles[roleIndex], name, description };
    res.json({ success: true });
});

app.delete('/roles/:id', (req, res) => {
    const roleId = parseInt(req.params.id);
    const roleIndex = roles.findIndex(r => r.id === roleId);
    
    if (roleIndex === -1) {
        return res.status(404).json({ error: 'Role não encontrada' });
    }
    
    roles.splice(roleIndex, 1);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🚀 Mock Backend rodando em http://localhost:${PORT}`);
    console.log(`📋 Usuários disponíveis:`);
    console.log(`   - admin / admin`);
    console.log(`   - user / user`);
});
