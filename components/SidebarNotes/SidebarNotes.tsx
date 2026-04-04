"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css";

const TAGS = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  const pathname = usePathname();
  const currentTag = pathname.split("/").pop() || "all";

  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
            style={{
              backgroundColor: currentTag === tag ? "#444" : "red",
              color: currentTag === tag ? "#310b0bff" : "white",
            }}
          >
            {tag === "all" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
