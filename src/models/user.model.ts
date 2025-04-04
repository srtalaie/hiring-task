import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  bookCollection: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email',
      }
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'],
      validate: {
        validator: function (v: string) {
          // Custom validation logic (e.g., check for special characters)
          return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v);
        },
        message: 'Password must contain at least one letter, one number, and one special character'
      }
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bookCollection: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>("User", userSchema);
