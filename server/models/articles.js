import mongoose, {mongo, Schema} from 'mongoose';

const ArticleSchema = new Schema({
  title: String,
  descriptions: String,
  image:  String,
  author: String,
  createdAt: {type: Date, default: Date.now},
})
const Articles = mongoose.model('articles', ArticleSchema)
export default Articles;
