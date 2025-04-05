import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string[];
  summary: string;
  isbn: string;
  owner: Types.ObjectId;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: [String],
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBook>("Book", bookSchema);
