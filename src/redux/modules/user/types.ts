import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export interface State {
  counter: number;
}

export enum Actions {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export type ActionsType = ActionType<typeof actions>;
