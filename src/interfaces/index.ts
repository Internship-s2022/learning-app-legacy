import { Postulant } from 'src/interfaces/entities';

export interface GeneralDataType {
  _id: string;
  postulant?: { dni: Postulant['dni'] };
}

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
