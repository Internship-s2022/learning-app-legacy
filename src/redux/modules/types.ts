import { userTypes } from './user';

export interface RootReducer {
  user: userTypes.State;
}

export type RootAction = userTypes.ActionsType;

export type ApiResponse<T> = { message: string; data: T; error: boolean };
