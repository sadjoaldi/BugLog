import type { Request, Response } from "express";
import { tagService } from "../services/tagService";

export const tagController = {
  // GET /api/v1/tags
  async getAll(req: Request, res: Response) {
    try {
      const tags = await tagService.getTags();
      res.json(tags);
      return;
    } catch (_) {
      res.status(500).json({ error: "Failed to fetch tags" });
      return;
    }
  },

  // GET /api/v1/tags/bug-reports/:id/tags
  async getByBugReportId(req: Request<{ id: string }>, res: Response) {
    try {
      const tags = await tagService.getTagsByBugReportId(req.params.id);
      res.json(tags);
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "BugReport not found") {
        res.status(404).json({ error: "BugReport not found" });
        return;
      }
      res.status(500).json({ error: "Failed to fetch tags" });
      return;
    }
  },
};
