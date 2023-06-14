
import { compare, hash } from "bcrypt";
import express from 'express';
import { UserModel } from '../entity/User';
import { generateRefreshToken, generateAccessToken } from "../services/authentication";
import { verify } from "jsonwebtoken";
import { auth_config } from "../../config/env";
import authGuard from "../guards/auth";
import _ from "lodash";

const router = express.Router();

router.post('/auth/login', async (req, res) => {

    const body = req?.body
    const user = await UserModel.findOne({ email: body?.email });

    if(!user) 
        return res.status(404).send('User not found')
    if (!await compare(body?.password, user?.password as string))
        return res.status(400).send('Invalid password')

    // const refreshToken = generateRefreshToken({ user }, { expiresIn: '7d' })
    const accessToken = generateAccessToken({ user }, { expiresIn: '30d' })

    // res.cookie('jwt', refreshToken, {
    //     httpOnly: true,
    //     sameSite: 'none',
    //     secure: true,
    // })
    res.status(200)
    .json({ token: accessToken, role: user.role})
})

router.post('/auth/refresh-token', async (req, res) => {

    const token = req?.cookies['jwt'];
    console.log(req.cookies)
    if(!token) return res.status(401).send('Unathorized')

    let payload: any = null;
    try {
        payload = verify(token, auth_config.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.error(err);
        return res.status(401).send('Session Expired')
    }

    const user = await UserModel.findOne({ email: payload?.user?.email });
    if(!user) return res.status(404).send('User not found')

    const refreshToken = generateRefreshToken({ user }, { expiresIn: '7d' })
    const accessToken = generateAccessToken({ user }, { expiresIn: '15m' })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })
    res.status(200).json({ token: accessToken })
})

router.post('/add/user', async (req, res) => {
    let user = req?.body
    user.firstName = _.startCase(user.firstName)
    user.lastName = _.startCase(user.lastName)
    user.password = await hash(user.password, 12)

    user = await UserModel.create(user)
    return res.send(user)
})

router.post('/auth/logout', authGuard, async (req, res) => {
    try {
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        res.clearCookie("jwt");
        return res.status(200).send('Logged out')
    } catch(e) {
        console.error(e)
    }
})

router.get('/auth/session', authGuard, async (req, res) => {
    let user = res.locals?.payload?.user
    if(!user) throw new Error('Not authenticated')

    user = await UserModel.findOne({ email: user?.email });
    return res.status(200).json({ user })
})


export default router