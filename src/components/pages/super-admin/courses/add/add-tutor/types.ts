import { User } from 'src/redux/modules/user/types';

import { CourseUser } from '../types';

export interface AddTutorType {
  courseId: string;
  courseUsers: CourseUser[];
  setCourseUsers: React.Dispatch<React.SetStateAction<CourseUser[]>>;
  usersFiltered: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
