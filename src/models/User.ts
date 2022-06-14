import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
