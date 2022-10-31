import React from 'react';
import { FieldValues } from 'react-hook-form';

import CourseTableFilters from './course-filters';
import { TableFilterProps } from './types';
import UserTableFilters from './user-filters';

const TableFilters = <DataFiltersType extends FieldValues>({
  filter,
  onFiltersSubmit,
}: TableFilterProps<DataFiltersType>) => {
  switch (filter) {
    case 'user':
      return <UserTableFilters onFiltersSubmit={onFiltersSubmit} />;
    case 'course':
      return <CourseTableFilters onFiltersSubmit={onFiltersSubmit} />;
    default:
      return null;
  }
};

export default TableFilters;
