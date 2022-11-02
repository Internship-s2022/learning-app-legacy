import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootAction, RootReducer } from 'src/redux/modules/types';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

import AddAdmin from './add-admin';
import AddCourse from './add-course';
import AddTutor from './add-tutor';
import Confirm from './confirm';
import { CourseUser, SelectedUsers } from './types';

const AddCourseFlow = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  const [courseId, setCourseId] = useState<string>('');
  const [courseUsers, setCourseUsers] = useState<CourseUser[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsers[]>([]);
  const { pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(
      getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);

  return (
    <>
      <AddCourse setCourseId={setCourseId} />
      <AddAdmin
        courseId={courseId}
        setCourseUsers={setCourseUsers}
        setUsersFiltered={setUsersFiltered}
      />
      <AddTutor
        courseId={courseId}
        setCourseUsers={setCourseUsers}
        courseUsers={courseUsers}
        usersFiltered={usersFiltered}
        setSelectedUsers={setSelectedUsers}
      />
      <Confirm selectedUsers={selectedUsers} />
    </>
  );
};

export default AddCourseFlow;
