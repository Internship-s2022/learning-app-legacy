import React from 'react';
import { FieldValues } from 'react-hook-form';

import AdminCourseUserTableFilters from './admin-course-user';
import CourseTableFilters from './course';
import CourseUserTableFilters from './courseUser';
import UserGroupTableFilters from './group';
import GroupTableFilters from './group-table';
import PostulantCourseUserTableFilters from './postulant-course';
import StudentTableFilters from './student';
import StudentCourseTableFilters from './student-course';
import { TableFilterProps } from './types';
import UserTableFilters from './user';

const TableFilters = ({ filter, ...rest }: TableFilterProps<FieldValues>) => {
  switch (filter) {
    case 'user':
      return <UserTableFilters {...rest} />;
    case 'course':
      return <CourseTableFilters {...rest} />;
    case 'courseUser':
      return <CourseUserTableFilters {...rest} />;
    case 'adminCourseUser':
      return <AdminCourseUserTableFilters {...rest} />;
    case 'postulantCourse':
      return <PostulantCourseUserTableFilters {...rest} />;
    case 'student':
      return <StudentTableFilters {...rest} />;
    case 'studentCourse':
      return <StudentCourseTableFilters {...rest} />;
    case 'userGroup':
      return <UserGroupTableFilters {...rest} />;
    case 'groupList':
      return <GroupTableFilters {...rest} />;
    default:
      return null;
  }
};

export default TableFilters;
