import express from 'express';
import { UserModel } from '../entity/User';
import _ from 'lodash';


const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await UserModel.find({})
    res.json(users)
})

router.get('/user/:id', async (req, res) => {
    const user = await UserModel.findById(req?.params?.id)
    res.json(user)
})

router.put('/update/user/:id', async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(user)
})

export default router