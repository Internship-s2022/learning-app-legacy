import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  question: undefined,
  questions: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const questionReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    case Actions.GET_QUESTIONS_FETCHING:
    case Actions.EDIT_QUESTIONS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload.data.map((question) =>
          question.options !== null ? { ...question } : { ...question, options: [] },
        ),
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.EDIT_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload.data.map((question) =>
          question.options !== null ? { ...question } : { ...question, options: [] },
        ),
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.SET_QUESTIONS_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };
    case Actions.RESET_QUESTIONS_QUERY:
      return {
        ...state,
        filterQuery: initialState.filterQuery,
      };
    case Actions.GET_QUESTIONS_ERROR:
      return {
        ...state,
        questions: initialState.questions,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    case Actions.EDIT_QUESTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    default:
      return state;
  }
};

export default questionReducer;
