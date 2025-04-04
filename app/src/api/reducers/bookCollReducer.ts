import { createSlice } from "@reduxjs/toolkit";
import { Book, BookCollectionState, Profile } from "../../../../types";
import { getProfile } from "../services/authService";
import { addBookToCollection, removeBookFromCollection } from '../services/bookCollService';

const initialState: BookCollectionState = {
  bookCollection: []
}

const bookCollectionSlice = createSlice({
  name: 'bookCollection',
  initialState,
  reducers: {
    setBookCollection: (state, action) => {
      state.bookCollection = action.payload
    },
    updateBookCollection: (state, action) => {
      const { book, actionType } = action.payload;
      if (actionType === 'add') {
        state.bookCollection.push(book);
      } else if (actionType === 'remove') {
        state.bookCollection = state.bookCollection.filter(b => b.id !== book);
      }
    }
  }
})

export const { setBookCollection, updateBookCollection } = bookCollectionSlice.actions


export const fetchBookCollection = () => {
  return async (dispatch: (action: { type: string; payload: Book[] }) => void) => {
    try {
      const profile: Profile = await getProfile()
      const bookCollection = profile.bookCollection || []
      dispatch(setBookCollection(bookCollection))
    } catch (error) {
      console.error('Error fetching book collection:', error)
      throw error
    }
  }
}

export const addABookToCollection = (bookId: string) => {
  return async (dispatch: (action: { type: string; payload: string }) => void) => {
    try {
      const book = await addBookToCollection(bookId)
      dispatch(updateBookCollection({ book, actionType: 'add' }))
    } catch (error) {
      console.error('Error adding book to collection:', error)
      throw error
    }
  }
}

export const removeABookFromCollection = (bookId: string) => {
  return async (dispatch: (action: { type: string; payload: string }) => void) => {
    try {
      await removeBookFromCollection(bookId)
      dispatch(updateBookCollection({ bookId, actionType: 'remove' }))
    } catch (error) {
      console.error('Error removing book from collection:', error)
      throw error
    }
  }
}

export default bookCollectionSlice.reducer