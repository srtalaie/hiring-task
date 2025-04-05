import axios from 'axios';
import { Book, BookCreate } from '../../../../types';
import { authHeader } from './authService';
const baseUrl = '/api/book';

const createBook = async (book: BookCreate) => {
  try {
    const config = {
      headers: authHeader(),
    }
    const req = await axios.post(`${baseUrl}/create-book`, book, config)
    return req.data;
  } catch (error) {
    console.error('Error creating a book:', error);
    throw error;
  }
}

const getBooks = async () => {
  try {
    const req = await axios.get(`${baseUrl}/`)
    return req.data;
  } catch (error) {
    console.error('Error getting books:', error);
    throw error;
  }
}

const getBook = async (bookId: string) => {
  try {
    const req = await axios.get(`${baseUrl}/${bookId}`)
    return req.data;
  } catch (error) {
    console.error('Error getting a book:', error);
    throw error;
  }
}

const editBook = async (book: Book, bookId: string) => {
  try {
    const config = {
      headers: authHeader(),
    }
    const req = await axios.put(`${baseUrl}/edit/${bookId}`, book, config)
    return req.data;
  } catch (error) {
    console.error('Error editing a book:', error);
    throw error;
  }
}

const deleteBook = async (bookId: string) => {
  try {
    const config = {
      headers: authHeader(),
    }
    const req = await axios.delete(`${baseUrl}/delete/${bookId}`, config)
    return req.data;
  } catch (error) {
    console.error('Error deleting a book:', error);
    throw error;
  }
}

export { createBook, deleteBook, editBook, getBook, getBooks };

