import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import NoteDetailsClient from "./NoteDetails.client";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
