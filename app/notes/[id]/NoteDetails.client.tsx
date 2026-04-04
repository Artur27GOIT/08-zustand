"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NoteDetailsClient({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div>
      <button onClick={() => router.back()}>Close</button>

      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: {data.tag}</p>
      <p>Created at: {new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}
