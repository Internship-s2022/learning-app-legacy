import { ActionType } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';

import * as actions from './actions';

export interface ModalState {
  open?: boolean;
  title: string;
  description: string | JSX.Element;
  type: 'alert' | 'confirm';
  handleConfirm?: () => void;
}

export interface TablePaginationState {
  pageNumber: number;
  limitNumber: number;
  pagination: Pagination;
}

export interface SetPageType {
  pageNumber: number;
  pagination: Pagination;
}
export interface SetLimitType {
  limitNumber: number;
  pagination: Pagination;
}

export interface uiState {
  modal: ModalState;
  tablePagination: TablePaginationState;
}

export enum Actions {
  OPEN_MODAL = 'OPEN_MODAL',
  HIDE_MODAL = 'HIDE_MODAL',
  SET_TABLE_PAGE = 'SET_TABLE_PAGE',
  SET_TABLE_LIMIT = 'SET_TABLE_LIMIT',
}

export type ActionsType = ActionType<typeof actions>;
