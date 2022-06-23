import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  avatar: string;
  email: string;
  password: string;
  role: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name!'],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/paulodantas/image/upload/v1655992674/mern-auth/avatar_bp058g.png',
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
