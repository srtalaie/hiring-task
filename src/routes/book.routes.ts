import { Router } from "express";
import {
  createBook,
  deleteBook,
  editBook,
  getBook,
  getBooks,
} from "../controllers/book.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-book", authenticate, createBook);
router.get("/", getBooks);
router.get("/:bookId", getBook);
router.put("/edit/:bookId", authenticate, editBook);
router.delete("/delete/:bookId", authenticate, deleteBook);

export default router;
