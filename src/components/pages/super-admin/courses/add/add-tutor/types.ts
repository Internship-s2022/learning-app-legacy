import { CourseUser, SelectedUsers } from 'src/interfaces/entities/course';

export interface AddTutorsProps {
  selectedTutors: SelectedUsers[];
  setSelectedTutors: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
  courseUsers: CourseUser[];
  isValidContinueTutor: boolean;
}
