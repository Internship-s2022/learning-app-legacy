import { CourseUser, SelectedUsers } from '../types';

export interface AddTutorsProps {
  selectedTutors: SelectedUsers[] | [];
  setSelectedTutors: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
  courseUsers: CourseUser[];
}
