import mongoose, {mongo, Schema} from 'mongoose';

const CommentsSchema = new Schema({
  comment: String,
  user: String,
  blog: String,
  createdAt: {type: Date, default: Date.now},
})
const Comments = mongoose.model('comments', CommentsSchema)
export default Comments;
