import { Router } from "express";
import { noteController } from "../controllers/noteController";

const router: Router = Router();

router.get("/", noteController.getAll);
router.get("/:id", noteController.getNoteById);
router.post("/", noteController.create);
router.patch("/:id", noteController.update);
router.delete("/:id", noteController.delete);

export default router;
