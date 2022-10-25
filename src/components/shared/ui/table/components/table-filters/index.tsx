import React from 'react';

import { TableFilterProps } from '../../types';
import UserTableFilters from './user-filters';

const TableFilters = ({ filter, onFiltersSubmit }: TableFilterProps) => {
  switch (filter) {
    case 'user':
      return <UserTableFilters onFiltersSubmit={onFiltersSubmit} />;
    default:
      return null;
  }
};

export default TableFilters;
