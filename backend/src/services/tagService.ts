import { prisma } from "../lib/prisma";

export class TagService {
  // Get all tags
  async getTags() {
    return prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { bugReports: true },
    });
  }

  // Get tags by bug report id
  async getTagsByBugReportId(bugReportId: string) {
    const bugReport = await prisma.bugReport.findUnique({
      where: { id: bugReportId },
      include: { tags: true },
    });

    if (!bugReport) {
      throw new Error("BugReport not found");
    }

    return bugReport.tags;
  }
}

export const tagService = new TagService();
