import { Router } from 'express';
import { createBook, editBook, getBook, getBooks } from '../controllers/book.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-book', authenticate, createBook)
router.get('/books', getBooks)
router.get('/book/:bookId', getBook)
router.put('/edit/:bookId', authenticate, editBook)