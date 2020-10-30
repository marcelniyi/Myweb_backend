import Comments from '../models/comments';
import {validComment} from '../validations/comments.validation';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const addComments = async (req, res) => {
      const comment = req.body;

      const {error} = validComment(comment);
        if (error){
            res.status(400).json({
                message: error.details[0].message
            })
            return false;
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res
        .status(400).json({error: 'Invalid blog id'});

        const exist = await Comments.findOne({ comment: comment.comment, blog: req.params.id});
        if(exist){
          res.status(409).json({status: 409, errer: "Comment already sent"})
          return
        }
        const addComment = new Comments({
          comment: comment.comment,
          blog: req.params.id,
          user: req.data.user.id,
        })
        try {
          const result = await addComment.save();
          res.status(201).json(result);
        }catch(err) {
          throw new Error(err);
        }


}

export const listComments = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res
  .status(400).json({error: 'Invalid blog id'});
  
  const comments = await Comments.find({});
  try {
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
}
