import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICollection extends Document {
  owner: Types.ObjectId;
  books: Types.ObjectId[];
}

const collectionSchema = new Schema<ICollection>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  books: {
    type: [Schema.Types.ObjectId],
    ref: "Book",
  },
});

export default mongoose.model<ICollection>("Collection", collectionSchema);
