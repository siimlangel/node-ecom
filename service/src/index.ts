import "module-alias/register";
import dotenv from 'dotenv';
import server from './server';

dotenv.config();
const PORT = process.env.PORT || 8080;
server().listen(PORT);

