import { authTypes } from './auth';
import { uiTypes } from './ui';
import { userTypes } from './user';

export interface RootReducer {
  user: userTypes.State;
  ui: uiTypes.uiState;
  auth: authTypes.State;
}

export type RootAction = userTypes.ActionsType | uiTypes.ActionsType | authTypes.ActionsType;

export type ApiResponse<T> = { message: string; data: T; error: boolean };
