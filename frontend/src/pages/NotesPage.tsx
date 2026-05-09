import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notesApi } from "../api/notes";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import type { Note } from "../types";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await notesApi.getAll();
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filtered = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">DevNotes</h1>
          <button
            onClick={() => navigate("/notes/new")}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200"
          >
            + Nouvelle note
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Notes */}
        {isLoading ? (
          <p className="text-center text-white/30 text-sm">Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-white/30 text-sm">
            {search ? "Aucune note trouvée." : "Aucune note pour le moment."}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={(id) => navigate(`/notes/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
