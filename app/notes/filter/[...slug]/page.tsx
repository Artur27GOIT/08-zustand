import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const slug = resolved.slug?.[0] ?? "all";

  const queryParams =
    slug === "all" ? undefined : { tag: slug, page: 1, perPage: 12 };

  const response = await fetchNotes(queryParams);

  return <NotesClient notes={response.notes} tag={slug} />;
}
