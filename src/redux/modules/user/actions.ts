import { action } from 'typesafe-actions';

import { Actions } from './types';

export const increment = (counter: number) => action(Actions.INCREMENT, { counter });
export const decrement = (counter: number) => action(Actions.DECREMENT, { counter });
