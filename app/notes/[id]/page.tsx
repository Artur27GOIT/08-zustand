import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import NoteClient from "../filter/[...slug]/Notes.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const slug = resolved.slug?.[0] ?? "all";

  const queryParams = slug === "all" ? {} : { tag: slug, page: 1, perPage: 12 };

  await queryClient.prefetchQuery({
    queryKey: ["notes", slug],
    queryFn: () => fetchNotes(queryParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={slug} />
    </HydrationBoundary>
  );
}
