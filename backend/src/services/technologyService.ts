import { prisma } from "../lib/prisma";

export class TechnologyService {
  // Get all technologies
  async getTechnologies() {
    return prisma.technology.findMany({
      orderBy: { name: "asc" },
      include: { bugReports: true },
    });
  }

  // Get technologies by bug report id
  async getTechnologiesByBugReportId(bugReportId: string) {
    const bugReport = await prisma.bugReport.findUnique({
      where: { id: bugReportId },
      include: { technologies: true },
    });

    if (!bugReport) {
      throw new Error("BugReport not found");
    }

    return bugReport.technologies;
  }
}

export const technologyService = new TechnologyService();
