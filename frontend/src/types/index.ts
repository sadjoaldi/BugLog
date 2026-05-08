export type Tag = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = {
  title: string;
  content: string;
  tags?: string[];
};

export type UpdateNoteInput = {
  title?: string;
  content?: string;
  tags?: string[];
};
