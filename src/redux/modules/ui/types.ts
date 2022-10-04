import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export interface State {
  open: boolean;
}

export enum Actions {
  SET_MODAL = 'SET_MODAL',
}

export type ActionsType = ActionType<typeof actions>;
