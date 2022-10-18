export type Pagination = {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
};

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
