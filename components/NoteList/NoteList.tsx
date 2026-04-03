"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
  tag: string;
}

export default function NoteList({ notes, tag }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul>
      {notes.map((note: Note) => (
        <li key={note.id}>
          <Link href={`/notes/filter/${tag}/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>

          <p>{note.content}</p>
          <p>{note.tag}</p>

          <button onClick={() => mutation.mutate(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
