"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
  forcePage: number; // ← важливо
}

export default function Pagination({
  pageCount,
  onPageChange,
  forcePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={(event) => onPageChange(event.selected)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
      breakClassName={css.page}
    />
  );
}
