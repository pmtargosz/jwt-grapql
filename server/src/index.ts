import 'dotenv/config';
import * as http from 'http';
import app from './app';

const server = http.createServer(app);
server.listen(process.env.PORT);
console.log(`The server is listening on port ${process.env.PORT}`);
