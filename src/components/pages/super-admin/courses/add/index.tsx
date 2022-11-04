import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootAction, RootReducer } from 'src/redux/modules/types';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import { CourseType } from './add-course/types';
import AddTutor from './add-tutor';
import Confirm from './confirm';
import { CourseUser, SelectedUsers } from './types';
const AddCourseFlow = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  const [course, setCourse] = useState<CourseType>();
  const [courseUsers, setCourseUsers] = useState<CourseUser[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsers[]>([]);
  const { pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(
      getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);
  console.log('usersFiltered', usersFiltered);
  return (
    <>
      <AddCourse setCourse={setCourse} />
      <AddAdmin course={course} setCourse={setCourse} setUsersFiltered={setUsersFiltered} />
      <AddTutor
        course={course}
        setCourse={setCourse}
        courseUsers={courseUsers}
        usersFiltered={usersFiltered}
        setSelectedUsers={setSelectedUsers}
      />
      <Confirm course={course} />
    </>
  );
};

export default AddCourseFlow;
