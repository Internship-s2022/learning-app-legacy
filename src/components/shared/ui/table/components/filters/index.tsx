import React from 'react';
import { FieldValues } from 'react-hook-form';

import AdminCourseUserTableFilters from './admin-course-user';
import CourseTableFilters from './course';
import CourseUserTableFilters from './courseUser';
import PostulantCourseUserTableFilters from './postulant-course';
import StudentTableFilters from './student';
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
    case 'adminCourseUser':
      return <AdminCourseUserTableFilters onFiltersSubmit={onFiltersSubmit} />;
    case 'postulantCourse':
      return <PostulantCourseUserTableFilters onFiltersSubmit={onFiltersSubmit} />;
    case 'student':
      return <StudentTableFilters onFiltersSubmit={onFiltersSubmit} />;
    default:
      return null;
  }
};

export default TableFilters;
