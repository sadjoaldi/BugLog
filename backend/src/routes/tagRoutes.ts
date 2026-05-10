import { Router } from "express";
import { tagController } from "../controllers/tagController";

const router: Router = Router();

router.get("/", tagController.getAll);
router.get("/bug-reports/:id/tags", tagController.getByBugReportId);

export default router;
