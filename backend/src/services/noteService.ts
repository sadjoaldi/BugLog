import { prisma } from "../lib/prisma";

type CreateNoteInput = {
  title: string;
  content: string;
  tags?: string[];
};

type UpdateNoteInput = {
  title?: string;
  content?: string;
  tags?: string[];
};

export class NoteService {
  //create note

  async createNote(input: CreateNoteInput) {
    const { title, content, tags = [] } = input;

    return prisma.note.create({
      data: {
        title,
        content,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  //read all notes

  async getNotes() {
    return prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    });
  }

  //read single note

  async getNoteById(id: string) {
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  }

  // update note

  async updateNote(id: string, input: UpdateNoteInput) {
    const { title, content, tags } = input;

    return prisma.note.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(tags !== undefined && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
      include: { tags: true },
    });
  }

  // delete note

  async deleteNote(id: string) {
    return prisma.note.delete({
      where: { id },
    });
  }
}

export const noteService = new NoteService();
