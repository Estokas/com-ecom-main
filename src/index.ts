import express, { Express } from "express";
import { server_config } from "../config/env";
import cookieParser from "cookie-parser";
import corsOption from "../config/corsOption";
import cors from 'cors';
import routers from "./routers";
import { connect } from "mongoose";

async function main() {
    const app: Express = express();
    
    // app.use(cors(corsOption))
    app.use(express.json())
    app.use(cookieParser())
    app.use(routers)
    
    app.use('/public', express.static('public'));

    const { 
        connection: { host, port, name }
    } = await connect(server_config.DB_URI)

    console.log(`ServerDB is running at ${host}:${port}/${name}`)

    app.listen(server_config.SERVER_PORT, () => 
        console.log(`Server is running at ${server_config.SERVER_URI}:${server_config.SERVER_PORT}`)
    );
}

main().catch(error => console.log(error))
 
