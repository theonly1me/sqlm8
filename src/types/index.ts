export interface Code {
  name: string;
  query: string;
}

export interface QueryFormState {
  query: string;
  errors?: string | null;
  result?: string | null;
}

export interface ResultViewerProps {
  rows: Array<unknown>;
  columns: Array<string>;
  error?: string;
}
