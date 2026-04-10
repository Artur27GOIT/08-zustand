import axios from "axios";
import type { Note } from "../types/note";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export type DeleteNoteResponse = Note;

const API_URL = "https://notehub-public.goit.study/api/notes";

export const fetchNoteById = async (id: string): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.get<Note>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.get<FetchNotesResponse>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: params.page ?? 1,
      perPage: params.perPage ?? 12,
      search: params.search || undefined,
      ...(params.tag ? { tag: params.tag } : {}),
    },
  });

  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.post<Note>(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.delete<DeleteNoteResponse>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
