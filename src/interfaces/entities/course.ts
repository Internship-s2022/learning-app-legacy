import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { AdmissionTest } from 'src/interfaces/entities/admission-test';
import { User } from 'src/interfaces/entities/user';

import { GeneralDataType } from '..';

export type RoleType = 'ADMIN' | 'TUTOR' | 'AUXILIARY' | 'STUDENT';
export interface ConfirmProps {
  courseUsers: CourseUser[];
  controlAddCourse: Control<Course>;
  onSubmitAddCourse: (data: Course) => void;
  handleSubmitAddCourse: UseFormHandleSubmit<Course>;
}

export interface Course {
  _id: string;
  name: string;
  admissionTests?: AdmissionTest[];
  courseUsers?: SelectedUsers[];
  description: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  isInternal: string;
  isActive: boolean;
}

export interface AddAdminProps {
  selectedAdmins: SelectedUsers[];
  setSelectedAdmins: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
}

export interface AddCourseProps {
  controlAddCourse: Control<Course>;
  handleSubmitAddCourse: UseFormHandleSubmit<Course>;
  onSubmitAddCourse: (data: Course) => void;
}

export interface AddTutorsProps {
  selectedTutors: SelectedUsers[];
  setSelectedTutors: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
  courseUsers: CourseUser[];
}

export interface SelectedUsers {
  user: User;
  role?: RoleType;
  isActive: boolean;
}

export interface CourseUser extends SelectedUsers, GeneralDataType {
  course?: string;
}
