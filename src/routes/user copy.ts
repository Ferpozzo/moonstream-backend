/* import { User } from './../models/users';
import express from 'express'


export const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.send(user)
    } catch (err) {
        return res.status(400).send({ error: `Registration failed : ${err}` })
    }
});
router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body).then(user => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).send({ error: `User not exists` })
        });
    } catch (err) {
        return res.status(400).send({ error: `Update failed : ${err}` })
    }
});
router.get('/users', async (req, res) => {
    try {
        const user = await User.find()
        return res.send(user)
    } catch (err) {
        return res.status(400).send({ error: `Get failed : ${err}` })
    }
});
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, req.body).then(user => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).send({ error: `User not exists` })
        });
    } catch (err) {
        return res.status(400).send({ error: `Get failed : ${err}` })
    }
});
router.get('/', (req, res) => {
    res.send('Works')
}) */