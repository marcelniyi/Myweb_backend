import Users from '../models/user';
import jwt from 'jsonwebtoken';
import {
  passwordHash,
  passwordCompare,
  generateToken }
from '../helpers/auth';
import { user } from '../validations/user.validation';

export const userRegister = async(req, res) => {
  const newUser = req.body;
  const {error} = user(newUser);
    if (error){
        res.status(400).json({
            message: error.details[0].message
        })
        return false;
    }
    const exist = await Users.findOne({ email: newUser.email});
    if(exist){
      res.status(409).json({ errer: "User already exist"})
      return
    }
    const addUser = new Users({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: passwordHash(newUser.password),
    })
    try {
      const result = await addUser.save();
      res.status(201).json({
                message: 'Account created!',
                Body: result
            });
    }catch(err) {
      throw new Error(err);
    }

}


export const userLogin = async(req, res) => {
  const { email, password} = req.body;
  if(password && email){
    const userCreadentials = await Users.findOne({ email});
    if(!userCreadentials) return res.status(400).json({error: 'Invalid Email or Password!'})
    const userInfo = {
      email: userCreadentials.email,
      isadmin: userCreadentials.isadmin,
      id: userCreadentials._id,
    }

    const pass = passwordCompare(userCreadentials.password, password)
    if(pass){
      const token = generateToken(userInfo);
      return res.status(200).json({
          message: 'Logged in successfully!',
          user: userInfo,
          token,
        });
    }

  } else {
    res.status(400).json({errer: "Provide email and password"})
  }
}


export const updateProfile = async (req, res) => {

        const userInfo = req.body;
        const exist = await Users.findById(req.data.user.id);

        const addBlog = new Users({
          firstname: userInfo.firstname || exist.firstname,
          lastname: userInfo.lastname || exist.lastname,
        })
        try {
          const result = await addBlog.save();
          res.status(201).json({
            message: 'profile updated successfully',
            result
          });
        }catch(err) {
          throw new Error(err);
        }
}

export const listUsers = async (req, res) => {
        if(!req.data.user.isadmin) return res.status(409).json({error: 'Login as admin'})
        try {
          const users = await Users.find({});
          res.status(201).json({
            users: users
          });
        }catch(err) {
          throw new Error(err);
        }
}


export const userChangeRole = async (req, res) => {
        //if(!req.data.user.isadmin) return res.status(409).json({error: 'Login as admin'})
        const exist = await Users.findById(req.id);
        const addBlog = new Users({isadmin: req.body.isadmin})
        try {
          const result = await addBlog.save();
          res.status(201).json({
            message: 'User granted successfully',
            result
          });
        }catch(err) {
          throw new Error(err);
        }
}
