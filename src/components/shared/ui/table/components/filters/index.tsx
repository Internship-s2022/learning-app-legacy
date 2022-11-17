import React from 'react';
import { FieldValues } from 'react-hook-form';

import CourseTableFilters from './course';
import CourseUserTableFilters from './courseUser';
import { TableFilterProps } from './types';
import UserTableFilters from './user';

const TableFilters = <DataFiltersType extends FieldValues>({
  filter,
  onFiltersSubmit,
}: TableFilterProps<DataFiltersType>) => {
  switch (filter) {
    case 'user':
      return <UserTableFilters onFiltersSubmit={onFiltersSubmit} />;
    case 'course':
      return <CourseTableFilters onFiltersSubmit={onFiltersSubmit} />;
    case 'courseUser':
      return <CourseUserTableFilters onFiltersSubmit={onFiltersSubmit} />;
    default:
      return null;
  }
};

export default TableFilters;
