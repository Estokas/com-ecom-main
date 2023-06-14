import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const dataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "admin",
    database: "computer_ecommerce",
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: [],
    subscribers: [],
})
