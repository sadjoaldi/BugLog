import { Router } from "express";
import { bugReportController } from "../controllers/bugReportController";

const router: Router = Router();

router.get("/", bugReportController.getAll);
router.get("/:id", bugReportController.getOne);
router.post("/", bugReportController.create);
router.patch("/:id", bugReportController.update);
router.patch("/:id/favorite", bugReportController.toggleFavorite);
router.delete("/:id", bugReportController.delete);

export default router;
