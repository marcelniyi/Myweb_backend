import Queries from '../models/queries';
import jwt from 'jsonwebtoken';
import { validQuery } from '../validations/contact.validation'

export const addQueries = async (req, res) => {
      const query = req.body;

    const {error} = validQuery(query);
      if (error){
          res.status(400).json({
              message: error.details[0].message
          })
          return false;
      }

      const exist = await Queries.findOne({ message: query.message, email: query.email});
      if(exist){
        res.status(409).json({status: 409, errer: "Question already sent"})
        return
      }
      const addQuery = new Queries({
        names: query.names,
        email: query.email,
        message: query.message,
      })
      try {
        const result = await addQuery.save();
        res.status(201).json(result);
      }catch(err) {
        throw new Error(err);
      }
}


export const listQueries = async (req, res) => {
    const userPrev = req.data.user;
    //console.log(userPrev);
    //if(!req.data.user.isadmin) return res.status(409).json({error: 'Login as admin'})
    const questions = await Queries.find({});
    try {
      res.send(questions);
    } catch (err) {
      res.status(500).send(err);
    }
}
