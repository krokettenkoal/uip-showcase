import type {PoolOptions} from "mysql2/promise";
import mysql from 'mysql2/promise';
import { DB_HOST, DB_SCHEMA, DB_USER, DB_PW } from '$env/static/private';

const access: PoolOptions = {
    host: DB_HOST,
    database: DB_SCHEMA,
    user: DB_USER,
    password: DB_PW,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

export const conn = mysql.createPool(access);