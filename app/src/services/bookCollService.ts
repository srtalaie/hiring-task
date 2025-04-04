import axios from 'axios';
import { authHeader } from './authService';
const baseUrl = '/api/book-collection';

const addBookToCollection = async (bookId: string) => {
  try {
    const config = {
      headers: authHeader(),
    }
    const req = await axios.put(`${baseUrl}/add-book`, { bookId: bookId }, config)
    return req.data
  } catch (error) {
    console.error('Error adding book to collection:', error);
    throw error;
  }
}

const removeBookFromCollection = async (bookId: string) => {
  try {
    const config = {
      headers: authHeader(),
      data: { bookId: bookId }
    }
    const req = await axios.delete(`${baseUrl}/remove-book`, config)
    return req.data;
  } catch (error) {
    console.error('Error removing book from collection:', error);
    throw error;
  }
}

export { addBookToCollection, removeBookFromCollection };

