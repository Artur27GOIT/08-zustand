import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub — Smart Notes Manager",
  description:
    "NoteHub — застосунок для створення, пошуку та керування нотатками.",
  openGraph: {
    title: "NoteHub — Smart Notes Manager",
    description:
      "Створюйте, фільтруйте та керуйте нотатками у зручному інтерфейсі.",
    url: "https://your-domain.vercel.app",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
      >
        <TanStackProvider>
          <Header />

          <main>{children}</main>

          {modal}

          <footer>
            <p>
              Created <time dateTime="2025">2025</time>
            </p>
          </footer>
        </TanStackProvider>
      </body>
    </html>
  );
}
