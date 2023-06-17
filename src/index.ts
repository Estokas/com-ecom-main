import express, { Express } from "express";
import { dataSource } from "./data-source";
import { server_config } from "../config/env";
import cookieParser from "cookie-parser";
import corsOption from "../config/corsOption";
import cors from 'cors';
import routers from "./routers";
import { connect } from "mongoose";

// Uncomment the code below if you want to use dataSource.initialize()
// dataSource.initialize().then(async () => {
// ...

const app: Express = express();

app.use(cors(corsOption)); // Enable CORS using the provided options

app.use(express.json());
app.use(cookieParser());
app.use(routers);

app.use('/public', express.static('public'));

// Connection URL - Replace with your MongoDB connection URL
const url = 'mongodb://127.0.0.1:27017/computer-ecommerce-db';

// Connect to the MongoDB server
connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB server');
    // Perform database operations here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Uncomment the code below if you want to use server_config.DB_URI for connection details
// const { 
//     connection: { host, port, name }
// } = await connect(server_config.DB_URI)
// console.log(`ServerDB is running at ${host}:${port}/${name}`)

app.listen(server_config.SERVER_PORT, () =>
  console.log(`Server is running at ${server_config.SERVER_URI}:${server_config.SERVER_PORT}`)
);
// }).catch(error => console.log(error))
