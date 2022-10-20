import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export interface ModalState {
  open?: boolean;
  title: string;
  description: string | JSX.Element;
  type: 'alert' | 'confirm';
  handleConfirm?: () => void;
}

export interface uiState {
  modal: ModalState;
}

export enum Actions {
  OPEN_MODAL = 'OPEN_MODAL',
  HIDE_MODAL = 'HIDE_MODAL',
}

export type ActionsType = ActionType<typeof actions>;
