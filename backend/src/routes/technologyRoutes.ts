import { Router } from "express";
import { technologyController } from "../controllers/technologyController";

const router: Router = Router();

router.get("/", technologyController.getAll);
router.get(
  "/bug-reports/:id/technologies",
  technologyController.getByBugReportId,
);

export default router;
