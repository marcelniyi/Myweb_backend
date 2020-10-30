import mongoose, {mongo, Schema} from 'mongoose';

const TodoSchema = new Schema({
  name: String,
  createdAt: {type: Date, default: Date.now},
})

const Todos = mongoose.model('todos', TodoSchema)

export default Todos;
