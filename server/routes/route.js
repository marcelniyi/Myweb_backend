import express from 'express';
import { checkToken } from '../helpers/auth';
import {userRegister, userLogin, listUsers} from '../controllers/users';

const router = express.Router();


router.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to Politico API' });
});

router.get('/api/v1/users', listUsers);


export default router;
