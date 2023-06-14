import dotenv from 'dotenv';

dotenv.config();

export const server_config = {
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_URI: process.env.SERVER_URI,
    DB_URI: process.env.DB_URI as string,
}

export const client_config = {
    CLIENT_URI: process.env.CLIENT_URI?.split(', ')
}

export const auth_config = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    HASHING_SECRET_KEY: process.env.HASHING_SECRET_KEY as string
}