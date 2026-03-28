"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, error, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData: (prev) => prev,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (selected: number) => {
    setPage(selected + 1);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <section>
      <h1>Notes</h1>

      <SearchBox value={search} onChange={handleSearchChange} />

      <button onClick={handleOpenModal}>Create note</button>

      {isFetching && <p>Updating...</p>}

      <NoteList notes={data.notes} />

      <Pagination
        pageCount={data.totalPages}
        onPageChange={handlePageChange}
        forcePage={page - 1}
      />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCancel={handleCloseModal} />
        </Modal>
      )}
    </section>
  );
}
