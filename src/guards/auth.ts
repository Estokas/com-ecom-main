import { verify } from "jsonwebtoken"
import { auth_config } from "../../config/env"
import type { Request, Response, NextFunction } from 'express';

const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization']

    if(!auth) return res.status(401).send('Unathorized')

    try {
        const token = auth.split(' ')[1]
        const payload = verify(token, auth_config.ACCESS_TOKEN_SECRET)
        res.locals.payload = payload
        return next()
    }
    catch(e) {
        console.error(e)
        return res.status(401).send('Unathorized')
    }   
}

export default authGuard