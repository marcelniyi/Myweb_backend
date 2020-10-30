import app from "../app"; // Link to your server file
import supertest from "supertest";
const request = supertest(app);
import mongoose from 'mongoose';

import {config} from '../../config';

const databaseName = config.dbUrl;
process.env.MONGODB_URL = 'mongodb://localhost';
import Users from '../models/user';

describe('User registration', () => {
  afterAll(async() => {
    await Users.deleteMany()
  });

  it('User should register', async done => {
    const res = await request
    .post('/api/v1/usersRegister')
  	.send({
        firstname: 'marcel',
        lastname: 'nyite',
        email: 'testing@gmail.com',
        password: 'andela'
      })
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('message')
    done()
  });

  it('User cant register when exist', async done => {
    const res = await request.post('/api/v1/usersRegister')
    .send({
      firstname: 'marcel',
      lastname: 'nyite',
      email: 'testing@gmail.com',
      password: 'andela'
      })
      expect(res.status).toBe(409)
      expect(res.body).toHaveProperty('errer')
    done()
  })

  it('Signup validation', async done => {
    const res = await request
    .post('/api/v1/usersRegister')
    .send({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      })
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message')
    done()
  })

  it('Should login a User', async done => {
    const userData = {
      email: 'testing@gmail.com',
      password: 'andela',
    };
    const res = await request
      .post('/api/v1/userLogin')
      .send(userData)
      expect(res.status).toBe(200)
      expect(res.body.message).toBe('Logged in successfully!')
      expect(res.body).toHaveProperty('token')
      done()
  });

  it('Should provide login Creadentials', async done => {
    const userData = {
      email: '',
      password: '',
    };
    const res = await request
      .post('/api/v1/userLogin')
      .send(userData)
      expect(res.status).toBe(400)
      expect(res.body.errer).toBe('Provide email and password')
      done()
  });

})
