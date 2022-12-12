import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';
import { QuestionType } from 'src/interfaces/entities/question';

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
    case Actions.CREATE_QUESTION_FETCHING:
    case Actions.EDIT_QUESTION_FETCHING:
    case Actions.GET_QUESTION_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        question: action.payload.data,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload.data] as QuestionType[],
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.payload.data,
        pagination: initialState.pagination,
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
    case Actions.CREATE_QUESTION_ERROR:
    case Actions.GET_QUESTION_BY_ID_ERROR:
      return {
        ...state,
        question: initialState.question,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    case Actions.EDIT_QUESTION_ERROR:
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
