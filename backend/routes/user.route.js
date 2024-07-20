import express from 'express';
import { addUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('running')
})

router.post('/users', async (req, res) => {
    let user = await addUser(req.body);
    res.send(user);
})

router.get('/users', async (req, res) => {
    let users = await getUsers();
    res.send(users);
})

router.get('/users/:id', async (req, res) => {
    let user = await getUser(req.params['id']);
    res.send(user);
})

router.put('/users/:id', async (req, res) => {
    await updateUser(req.params['id'], req.body);
    res.send({});
})

router.delete('/users/:id', async (req, res) => {
    await deleteUser(req.params['id']);
    res.send({});
})

export { router };