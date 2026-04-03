import { fetchNotes } from "@/lib/api";
import NotesList from "@/components/NoteList/NoteList";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const { tag } = await params;

  const currentTag = tag?.[0];

  const queryParams =
    currentTag === "all"
      ? undefined
      : { tag: currentTag, page: 1, perPage: 12 };

  const response = await fetchNotes(queryParams);
  const notes = response.notes;

  return <NotesList notes={notes} />;
}
