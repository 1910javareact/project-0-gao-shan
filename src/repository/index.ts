import { Pool } from 'pg';
console.log({
    user: process.env['PRC_USERNAME'],
    host: process.env['PRC_HOST'],
    database: process.env['PRC_DATABASE'],
    port: 5432,
    max: 5,
});

export const connectionPool: Pool = new Pool({
    user: process.env['PRC_USERNAME'],
    host: process.env['PRC_HOST'],
    database: process.env['PRC_DATABASE'],
    password: process.env['PRC_PASSWORD'],
    port: 5432,
    max: 5,
});

