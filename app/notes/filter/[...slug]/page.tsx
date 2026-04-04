import NotesClient from "./Notes.client";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const slug = resolved.slug?.[0] ?? "all";

  return <NotesClient tag={slug} />;
}
