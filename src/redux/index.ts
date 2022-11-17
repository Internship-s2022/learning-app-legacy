import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootReducer } from './modules/types';

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
