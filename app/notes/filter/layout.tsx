import type { ReactNode } from "react";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      {sidebar}
      {children}
    </div>
  );
}
