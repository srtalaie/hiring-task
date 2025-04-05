import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import User from "../models/user.model";

// Create a Book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get user input for book elements
    const { title, author, genre, summary, isbn } = req.body;
    // Get owner of book from auth
    const owner = await User.findById(req.user?.userId).exec();

    // Loop through genre array and make them lowercase
    let genreArr: string[] = [];

    if (genre) {
      genreArr = genre.map((g: string) => g.toLowerCase());
    }

    // Create a new book with user info
    const book = await Book.create({
      title: title,
      author: author,
      genre: genreArr,
      summary: summary,
      isbn: isbn,
      owner: owner,
    });

    res.status(201).json({
      message: "Book was successfully created",
      book: {
        id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        owner: book.owner,
        summary: book.summary,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a Book by id
export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params.bookId) {
      return res.status(400).json({
        message: "Something went wrong :(",
      });
    }

    const book = await Book.findById(req.params.bookId)
      .populate("owner")
      .exec();
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Get all books
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await Book.find({}).populate("owner").exec();

    if (!books) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Edit a book
export const editBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get user edit input
    const { title, author, genre, summary, isbn } = req.body;
    // Get owner of book from auth and book from params
    const [book, owner] = await Promise.all([
      Book.findById(req.params.bookId).populate("owner").exec(),
      User.findById(req.user?.userId).exec(),
    ]);

    if (!book) {
      return res.status(404).json({ message: "Book was not found" });
    }

    let genreArr: string[] = [];
    if (genre) {
      // Loop through genre array and make them lowercase
      genreArr = genre.map((g: string) => g.toLowerCase());
    }

    let combinedGenres: string[] = [];
    if (book.genre.length > 0 && genreArr.length > 0) {
      // Combine the two arrays and remove the duplicates
      console.log(book.genre, genreArr);

      combinedGenres = [...new Set([...book.genre, ...genreArr])];
    }

    if (!owner) {
      return res.status(500).json({ message: "Something went wrong" });
    } else if (book.owner._id.toString() !== owner?._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to change this book's info" });
    }

    // If there are edits to be made edit them, if not keep them the same as before
    book.title = title ? title : book.title;
    book.author = author ? author : book.author;
    book.genre = combinedGenres ? combinedGenres : book.genre;
    book.summary = summary ? summary : book.summary;
    book.isbn = isbn ? isbn : book.isbn;

    // Save doc with updated edits
    const savedBook = await book.save();
    res.status(200).json({
      message: "Successfully edited the book",
      book: {
        id: savedBook._id,
        title: savedBook.title,
        author: savedBook.author,
        genre: savedBook.genre,
        summary: savedBook.summary,
        isbn: savedBook.isbn,
        owner: savedBook.owner
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a book
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [book, owner] = await Promise.all([
      Book.findById(req.params.bookId).populate("owner").exec(),
      User.findById(req.user?.userId).exec(),
    ]);

    if (!owner) {
      return res.status(500).json({ message: "Something went wrong" });
    } else if (!book) {
      return res.status(404).json({ message: "Book was not found" });
    } else if (book.owner._id.toString() !== owner?._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to change this book's info" });
    }

    await Book.findByIdAndDelete(req.params.bookId);
    res.status(202).json({ message: "Book was deleted successfully" });
  } catch (error) {
    next(error);
  }
};
