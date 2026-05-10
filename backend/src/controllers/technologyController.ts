import type { Request, Response } from "express";
import { technologyService } from "../services/technologyService";

export const technologyController = {
  // GET /api/v1/technologies
  async getAll(req: Request, res: Response) {
    try {
      const technologies = await technologyService.getTechnologies();
      res.json(technologies);
      return;
    } catch (_) {
      res.status(500).json({ error: "Failed to fetch technologies" });
      return;
    }
  },

  // GET /api/v1/technologies/bug-reports/:id/technologies
  async getByBugReportId(req: Request<{ id: string }>, res: Response) {
    try {
      const technologies = await technologyService.getTechnologiesByBugReportId(
        req.params.id,
      );
      res.json(technologies);
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "BugReport not found") {
        res.status(404).json({ error: "BugReport not found" });
        return;
      }
      res.status(500).json({ error: "Failed to fetch technologies" });
      return;
    }
  },
};
