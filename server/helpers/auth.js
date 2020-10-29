import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret_key = process.env.SECRET_KEY;
export const passwordHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

export const passwordCompare = (passwordHash, password) => {
    return bcrypt.compareSync(password, passwordHash);
}

export const generateToken = (user) => {
  const token = jwt.sign({user},secret_key, { expiresIn: '3d' });
  return token;
}


export const checkToken = (req, res, next) => {
   const token = req.headers['authorization'];
   if (!token) {
     return res.status(401).json({
       error: 'Please, sign-in!',
     });
   }
    if(typeof token !== 'undefined') {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, secret_key, async (err, data) => {
          if (!err) {
            //console.log(data);
            req.data = data;
            next();
          }else{
            return res.status(500).json({
              error: 'Failed to authenticate token',
            });
          }
        });


    }
 }
