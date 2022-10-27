import { Pagination } from '.';
export interface CustomResponse<T> {
  data: T;
  message: string;
  error: boolean;
  status: number;
  pagination?: Pagination;
}

export interface CustomError {
  message: string;
  error: true;
  data: undefined;
}
