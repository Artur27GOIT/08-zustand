import type { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "Page not found — NoteHub",
  description: "Сторінка не знайдена. Такої сторінки у NoteHub не існує.",
  openGraph: {
    title: "Page not found — NoteHub",
    description: "Сторінка не знайдена. Такої сторінки у NoteHub не існує.",
    url: "https://your-domain.vercel.app/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
