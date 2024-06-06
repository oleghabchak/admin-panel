export type ErrorResponse = {
  code?: number;
  messages: string | string[];
  errorId?: string;
} | null;
