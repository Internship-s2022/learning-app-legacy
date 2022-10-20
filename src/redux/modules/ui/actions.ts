import { action } from 'typesafe-actions';

import { Actions, uiState } from './types';

export const openModal = (props: uiState['modal']) => action(Actions.OPEN_MODAL, props);
export const hideModal = () => action(Actions.HIDE_MODAL);
