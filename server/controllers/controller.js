import Users from '../models/users';
import jwt from 'jsonwebtoken';
import {
  passwordHash,
  passwordCompare,
  generateToken }
from '../helpers/auth';

export const userRegister = async(req, res) => {
  const newUser = req.body;
  if(newUser && newUser.email){
    const exist = await Users.findOne({ email: newUser.email});
    if(exist){
      res.status(409).json({status: 409, errer: "User already exist"})
      return
    }
    const addUser = new Users({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      phone: newUser.phone,
      password: passwordHash(newUser.password),
    })
    try {
      const result = await addUser.save();
      res.status(201).json(result);
    }catch(err) {
      throw new Error(err);
    }

  } else {
    res.status(400).json({status: 400, err: "Invalid data"})
  }
}

export const userLogin = async(req, res) => {
  const newUser = req.body;
  if(newUser.password && newUser.email){
    const user = await Users.findOne({ email: newUser.email});
    const userInfo = {
      email: user.email,
      isadmin: user.isadmin,
      id: user._id,
    }

    console.log(userInfo);

    if(user){
      const password = passwordCompare(user.password, newUser.password)
      if(password){
        const token = generateToken(userInfo);
        return res.status(200).send({
            status: 200,
            token,
            user: userInfo,
          });
      }

    }

  } else {
    res.status(400).json({status: 400, err: "Invalid email or password"})
  }
}
