import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const slug = params.slug?.[0] || "all";

  const title = `Notes filtered by: ${slug}`;
  const description = `Перегляд нотаток з фільтром: ${slug}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.vercel.app/notes/filter/${slug}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const tag = params.slug?.[0] || "all";

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
