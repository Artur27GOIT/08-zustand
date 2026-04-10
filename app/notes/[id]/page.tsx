import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  const title = note.title;
  const description = note.content.slice(0, 120) + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.vercel.app/notes/${params.id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const note = await fetchNoteById(params.id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
