import { sign, SignOptions } from "jsonwebtoken"
import { createCipheriv, randomBytes, createDecipheriv } from "crypto"
import { auth_config } from "../../config/env"


export const generateAccessToken = (payload: string | object | Buffer, options?: SignOptions) => {
    return sign(payload, auth_config.ACCESS_TOKEN_SECRET, options)
}

export const generateRefreshToken = (payload: string | object | Buffer, options?: SignOptions) => {
    return sign(payload, auth_config.REFRESH_TOKEN_SECRET, options)
}

export const encryptData = (data: any) => {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-192-cbc', Buffer.from(auth_config.HASHING_SECRET_KEY), iv)
    
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
    return {
        iv: iv.toString('hex'),
        encrypted
    }
}

export const decryptData = (data: any) => {
    const iv = Buffer.from(data.iv)
    const encryptedText = Buffer.from(data.encrypted, 'hex');

    const decipher = createDecipheriv(
        'aes-256-cbc', Buffer.from(auth_config.HASHING_SECRET_KEY), iv);
    return [decipher.update(encryptedText), decipher.final()].toString();
}