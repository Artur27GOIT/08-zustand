import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Сторінка для створення нової нотатки.",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Створення нової нотатки у NoteHub.",
    url: "https://your-domain.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function Page() {
  return <NoteForm />;
}
