import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.NODE_ENV !== 'test' ? process.env.DB : process.env.DB_TEST;

export const config = {
    port: process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT,
    dbName,
    host: process.env.BASE_URL,
    dbUrl: process.env.MONGODB_URL + `/${dbName}`
}
