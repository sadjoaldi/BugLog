import { useState } from "react";
import type { CreateNoteInput } from "../types";
import TagBadge from "./TagBadge";

type NoteFormProps = {
  initialValue?: {
    title: string;
    content: string;
    tags: string[];
  };
  onSubmit: (input: CreateNoteInput) => void;
  isLoading?: boolean;
};

export default function NoteForm({
  initialValue,
  onSubmit,
  isLoading,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [content, setContent] = useState(initialValue?.content ?? "");
  const [tags, setTags] = useState<string[]>(initialValue?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (name: string) => {
    setTags(tags.filter((t) => t !== name));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content, tags });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5
    "
    >
      {/* title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-sm font-medium text-white/60">
          Titre
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la note"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-200"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/60">Contenu</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu de la note..."
          rows={8}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-200 resize-none"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/60">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Ajouter un tag..."
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-200"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            Ajouter
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1">
                <TagBadge name={tag} />
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-white/30 hover:text-white/70 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !title.trim() || !content.trim()}
        className="mt-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading
          ? "Enregistrement..."
          : initialValue
            ? "Mettre à jour"
            : "Créer la note"}
      </button>
    </form>
  );
}
