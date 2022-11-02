import { User } from 'src/redux/modules/user/types';

import { CourseUser } from '../types';

type SetStateTypeArray = React.Dispatch<React.SetStateAction<string[]>>;

export interface AddCourseType {
  setCourseId: SetStateTypeArray;
}

export interface AddAdminCourse {
  courseId: string;
  setCourseUsers: React.Dispatch<React.SetStateAction<CourseUser[]>>;
  setUsersFiltered: React.Dispatch<React.SetStateAction<User[]>>;
}
