process.env.MONGODB_URL = 'mongodb://localhost/testing_db';
import app from "../app"; // Link to your server file
import supertest from "supertest";
const request = supertest(app);
import mongoose from 'mongoose';

import {config} from '../../config';

const databaseName = config.dbUrl;

import Queries from '../models/queries';
import { generateToken } from '../helpers/auth'

const token = generateToken({
    email: 'max@gmail.com',
    isadmin: 'false',
    id: '5f9654d321d4d92b1ec743d9',
})

describe('User registration', () => {
  afterAll(async() => {
    await Queries.deleteMany()
  });


  it('Anyone should post query', async done => {
    const res = await request
    .post('/api/v1/queries')
  	.send({
      names: 'hjgfgfhg',
      email: 'hghfgdf',
      message: 'gfgdf'
      })
      expect(res.status).toBe(201)
    done()
  });

  it('should not post query twice', async done => {
    const res = await request
    .post('/api/v1/queries')
    .send({
      names: 'hjgfgfhg',
      email: 'hghfgdf',
      message: 'gfgdf'
      })
      expect(res.status).toBe(409)
      expect(res.body).toHaveProperty('errer')
    done()
  })

  it('Query post validation', async done => {
    const res = await request
    .post('/api/v1/queries')
    .send({
      names: '',
      email: '',
      message: ''
      })
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message')
    done()
  })

  it('GET / queries not logedin', async done => {
    const res = await request
    .get('/api/v1/queries')
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('Please, sign-in!')
    done()
  })

  it('GET / queries', async done => {
    const res = await request
    .get('/api/v1/queries')
    .set("authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    done()
  })
})
