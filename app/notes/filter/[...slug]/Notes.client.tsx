"use client";

import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";

interface NotesClientProps {
  notes: Note[];
  tag: string;
}

export default function NotesClient({ notes, tag }: NotesClientProps) {
  return <NoteList notes={notes} tag={tag} />;
}
