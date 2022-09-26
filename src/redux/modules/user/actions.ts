import { Types } from './types';

export interface Action {
  type: string;
  payload: number;
}

export const increment = (value: number): Action => ({
  type: Types.INCREMENT,
  payload: value,
});

export const decrement = (value: number): Action => ({
  type: Types.DECREMENT,
  payload: value,
});
