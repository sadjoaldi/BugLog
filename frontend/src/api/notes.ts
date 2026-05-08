import axios from "axios";
import type { CreateNoteInput, Note, UpdateNoteInput } from "../types";

const api = axios.create({
  baseURL: "/api/v1",
});

export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    const { data } = await api.get("/notes");
    return data;
  },

  getById: async (id: string): Promise<Note> => {
    const { data } = await api.get(`/notes/${id}`);
    return data;
  },

  create: async (input: CreateNoteInput): Promise<Note> => {
    const { data } = await api.post("/notes", input);
    return data;
  },

  update: async (id: string, input: UpdateNoteInput): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}`, input);
    return data;
  },

  delete: async (id: string): Promise<void> => await api.delete(`/notes/${id}`),
};
