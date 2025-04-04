import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

// Add boook to Collection
export const addBookToCollection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Find the user and add the book to their collection
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $addToSet: { bookCollection: bookId } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Book added to collection successfully",
      bookCollection: user.bookCollection,
    });
  } catch (error) {
    next(error);
  }
};

// Remove book from Collection
export const removeBookFromCollection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Find the user and remove the book from their collection
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $pull: { bookCollection: bookId } },
      { new: true },
    ).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Book removed from collection successfully",
      bookCollection: user.bookCollection,
    });

  } catch (error) {
    next(error);
  }
};