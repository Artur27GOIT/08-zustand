"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import NoteForm from "@/components/NoteForm/NoteForm";
import SidebarNotes from "@/components/SidebarNotes/SidebarNotes";

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function NotesClient({ tag }: { tag: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        tag: tag === "all" ? undefined : tag,
        page: page,
        search: debouncedSearch,
        perPage: 12,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  const modalNoteId = searchParams.get("note");

  return (
    <div>
      <button onClick={() => setIsCreateOpen(true)}>Create note</button>

      <SearchBox
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <SidebarNotes />

      <NoteList notes={data.notes} />

      <Pagination
        pageCount={data.totalPages}
        forcePage={page - 1}
        onPageChange={(selected) => setPage(selected + 1)}
      />

      {modalNoteId && (
        <Modal onClose={() => router.back()}>
          <NoteDetailsClient id={modalNoteId} />
        </Modal>
      )}

      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)}>
          <NoteForm onCancel={() => setIsCreateOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
