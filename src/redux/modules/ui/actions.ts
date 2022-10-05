import { action } from 'typesafe-actions';

import { Actions } from './types';

export const setModal = (open: boolean) => action(Actions.SET_MODAL, open);
