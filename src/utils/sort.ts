import _ from 'lodash';

import { CourseUser, RoleType } from 'src/interfaces/entities/course-user';

const rolePriority: RoleType[] = ['ADMIN', 'TUTOR', 'AUXILIARY', 'STUDENT'];

export const sortByRole = (courseUsers: CourseUser[], order: RoleType[] = rolePriority) =>
  _.sortBy(courseUsers, (cUser) => _.indexOf(order, cUser.role));
