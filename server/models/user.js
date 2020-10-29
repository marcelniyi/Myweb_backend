import mongoose, {mongo, Schema} from 'mongoose';

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  othername: String,
  email: String,
  phone: Number,
  password: String,
  isadmin: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
})
const Users = mongoose.model('users', UserSchema)
export default Users;
