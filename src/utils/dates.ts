import { formatISO } from 'date-fns';

export const getISODate = (date: Date) => {
  return formatISO(date, { representation: 'date' });
};
