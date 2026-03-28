"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: {data.tag}</p>
    </div>
  );
}
