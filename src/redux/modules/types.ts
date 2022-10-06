import { uiTypes } from './ui';
import { userTypes } from './user';

export interface RootReducer {
  user: userTypes.State;
  ui: uiTypes.uiState;
}

export type RootAction = userTypes.ActionsType | uiTypes.ActionsType;

export type ApiResponse<T> = { message: string; data: T; error: boolean };
