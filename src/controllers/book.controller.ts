import { NextFunction, Request, Response } from 'express';
import Book from '../models/book.model';
import User from '../models/user.model';

// Create a Book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get user input for book elements
    const { title, author, genre, summary } = req.body
    // Get owner of book from auth
    const owner = await User.findById(req.user?.userId).exec()

    // Create a new book with user info
    const book = await Book.create({
      title,
      author,
      genre,
      summary,
      owner,
    })

    res.status(201).json({
      message: 'Book was successfully created',
      book: {
        id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        summary: book.summary,
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get a Book by id
export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get id of book from url
    const bookId = req.params.bookId

    if (!bookId) {
      return res.status(400).json({
        message: 'Something went wrong :('
      })
    }

    const book = await Book.findById(bookId).populate('owner').exec()
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json(book)
  } catch (error) {
    next(error)
  }
}

// Get all books
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find({}).populate('owner').exec()

    if (!books) {
      return res.status(404).json({ message: 'No books found' })
    }
    res.json(books)
  } catch (error) {

  }
}

// Edit a book