import { createSlice } from "@reduxjs/toolkit";
import { Book, BookCreate } from "../../../../types";
import { createBook, deleteBook, editBook, getBooks } from "../services/bookService";

const initialState: { books: Book[] } = {
  books: [],
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBookToState: (state, action: { payload: Book }) => {
      state.books.push(action.payload);
    },
    editBookInState: (state, action: { payload: Book }) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    removeBookFromState: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload.id);
    }
  }
})

export const { setBooks, addBookToState, removeBookFromState, editBookInState } = bookSlice.actions

export const fetchBooks = () => {
  return async (dispatch: (action: { type: string; payload: Book[] }) => void) => {
    try {
      const books: Book[] = await getBooks();
      dispatch(setBooks(books));
    } catch (error: unknown) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
}

export const addABook = (book: BookCreate) => {
  return async (dispatch: (action: { type: string; payload: Book }) => void) => {
    try {
      const newBook: Book = await createBook(book);
      dispatch(setBooks(newBook));
    } catch (error: unknown) {
      console.error('Error creating a book:', error);
      throw error;
    }
  }
}

export const editABook = (book: Book, bookId: string) => {
  return async (dispatch: (action: { type: string, payload: Book }) => void) => {
    try {
      const updatedBook: Book = await editBook(book, bookId)
      dispatch(editBookInState(updatedBook))
    } catch (error) {
      console.error('Error editing a book:', error);
      throw error;
    }
  }
}

export const deleteABook = (bookId: string) => {
  return async (dispatch: (action: { type: string, payload: string }
  ) => void) => {
    try {
      await deleteBook(bookId)
      dispatch(removeBookFromState(bookId))
    } catch (error) {
      console.error('Error deleting a book:', error);
      throw error;
    }
  }
}

export default bookSlice.reducer