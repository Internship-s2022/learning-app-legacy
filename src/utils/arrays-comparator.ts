import _ from 'lodash';

import { TransferListData } from 'src/components/shared/ui/transfer-list/types';

export const not = (a: TransferListData[], b: TransferListData[]) =>
  a?.filter((valueA) => b?.findIndex((valueB) => valueA._id === valueB._id) === -1);

export const intersection = (a: TransferListData[], b: TransferListData[]) =>
  a?.filter((valueA) => b?.findIndex((valueB) => valueA._id === valueB._id) !== -1);

export const isArrayEqual = (x, y) => _(x).xorWith(y, _.isEqual).isEmpty();
