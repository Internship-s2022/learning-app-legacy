import { modalTypes } from './ui';
import { userTypes } from './user';

export interface RootReducer {
  user: userTypes.State;
  modalState: modalTypes.State;
}

export type RootAction = userTypes.ActionsType | modalTypes.ActionsType;

export type ApiResponse<T> = { message: string; data: T; error: boolean };
