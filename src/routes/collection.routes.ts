import { Router } from "express";
import { addBookToCollection } from "../controllers/collection.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.put("/add-book", authenticate, addBookToCollection);
router.delete("/remove-book", authenticate, addBookToCollection);

export default router;
