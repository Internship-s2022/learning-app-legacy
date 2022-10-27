import { Reducer } from 'redux';

import { Actions, ActionsType, uiState } from './types';

const initialState: uiState = {
  modal: {
    title: '',
    description: '',
    open: false,
    type: 'alert',
  },
  tablePagination: {
    pageNumber: 1,
    limitNumber: 5,
    pagination: {
      totalDocs: 0,
      limit: 0,
      totalPages: 0,
      page: 0,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
  },
};

const uiReducer: Reducer<uiState, ActionsType> = (state = initialState, action): uiState => {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...action.payload,
          open: true,
        },
      };
    case Actions.HIDE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          open: false,
        },
      };
    case Actions.SET_TABLE_LIMIT:
      return {
        ...state,
        tablePagination: {
          ...state.tablePagination,
          limitNumber: action.payload.limitNumber,
          pagination: action.payload.pagination,
        },
      };
    case Actions.SET_TABLE_PAGE:
      return {
        ...state,
        tablePagination: {
          ...state.tablePagination,
          pageNumber: action.payload.pageNumber,
          pagination: action.payload.pagination,
        },
      };
    default:
      return state;
  }
};

export default uiReducer;
