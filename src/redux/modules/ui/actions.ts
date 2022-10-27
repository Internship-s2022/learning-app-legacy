import { action } from 'typesafe-actions';

import { Actions, SetLimitType, SetPageType, uiState } from './types';

export const openModal = (props: uiState['modal']) => action(Actions.OPEN_MODAL, props);
export const hideModal = () => action(Actions.HIDE_MODAL);

export const setTablePage = ({ pageNumber, pagination }: SetPageType) =>
  action(Actions.SET_TABLE_PAGE, { pageNumber, pagination });

export const setTableLimit = ({ limitNumber, pagination }: SetLimitType) =>
  action(Actions.SET_TABLE_LIMIT, { limitNumber, pagination });
