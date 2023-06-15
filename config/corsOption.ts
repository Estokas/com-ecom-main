import { client_config } from "./env"

const corsOption = {
    origin: '*',
    credentials: true
}

// const corsOption = {
//     origin: client_config.CLIENT_URI,
//     credentials: true
// }

export default corsOption