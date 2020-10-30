import mongoose, {mongo, Schema} from 'mongoose';

const QuerySchema = new Schema({
  names: String,
  email: String,
  message: String,
  createdAt: {type: Date, default: Date.now},
})
const Queries = mongoose.model('queries', QuerySchema)
export default Queries;
