import { parseEnv } from 'env/index';
parseEnv();
import Database from 'apps/database';
import Server from 'apps/server';

const database = new Database();
const server = new Server(database);

server.start();
