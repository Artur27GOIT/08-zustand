"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <a href={`/notes/${note.id}`}>View details</a>

          <button onClick={() => mutate(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
