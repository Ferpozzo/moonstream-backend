import { User } from './../models/users';
import express from 'express'
import cors from 'cors'
import { environment } from '../common/environments';
import bcrypt from 'bcrypt'
export const router = express.Router();
import jwt from 'jsonwebtoken';
router.get('/users', async (req, res) => {
    try {
        const user = await User.find().select('-channel')
        var data = new Date(Date.now())
        console.log(`Entrou ${data}`)
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
})
router.post('/users', async (req, res) => {
    try {
        const user : any = await User.create(req.body);
        user.password = undefined;
        return res.send(user)
    } catch (err) {
        return res.status(400).send({ error: `Registration failed : ${err}` })
    }
});
router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, req.body).then(user => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).send({ error: `User not exists` })
        });
    } catch (err) {
        return res.status(400).send({ error: `Update failed : ${err}` })
    }
});
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, req.body).then(user => {
            if (user) {
                return res.json(user)
            }
            return res.status(404).send({ error: `User not exists` })
        });
    } catch (err) {
        return res.status(400).send({ error: `Get failed : ${err}` })
    }
});
//autenticação
router.post('/users/authenticate', async (req, res) => {
    const {nick, password} = req.body;
    const user: any = await User.findOne({nick}).select('+password');
    if(!user){
        return res.status(404).send({error: 'User not found'});
    }else{
        if(!await bcrypt.compare(password,user.password)){
            return res.status(404).send({error:'Invalid password'})
        }else{
            user.password = undefined

            const token = jwt.sign({id: user._id},environment.security.secretToken,{
                expiresIn: '30 days'
            })
            res.send({user,token})
        }
    }
})
router.get('/', (req, res) => {
    res.send('Works')
})