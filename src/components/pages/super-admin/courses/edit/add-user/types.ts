import { RoleType } from 'src/interfaces/entities/course-user';

export interface AddUsersProps {
  role: RoleType;
  title: string;
  subtitle: string;
  maxAmount?: number;
}
