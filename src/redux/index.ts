import { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootAction, RootReducer } from './modules/types';

export type AppDispatch = ThunkDispatch<RootReducer, null, RootAction>;
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
