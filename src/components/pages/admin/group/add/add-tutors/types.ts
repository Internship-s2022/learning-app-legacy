import { SelectedUsers } from 'src/interfaces/entities/course-user';

export interface AddTutorsProps {
  selectedTutors: SelectedUsers[];
  setSelectedTutors: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
  isValidContinueTutors: boolean;
}
