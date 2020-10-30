import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.NODE_ENV !== 'test' ? process.env.DB : process.env.DB_TEST;

export const config = {
    port: process.env.NODE_ENV !== 'test' ? process.env.PORT : 3001,
    dbName,
    host: process.env.BASE_URL,
    dbUrl: process.env.MONGODB_URL || process.env.MONGODB_URL + `/${dbName}`
}
