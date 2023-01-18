import { SelectedUsers } from 'src/interfaces/entities/course-user';
import { ModuleType } from 'src/interfaces/entities/module';

export interface AddStudentsProps {
  modules: ModuleType[];
  selectedStudents: SelectedUsers[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
  isValidContinueStudents: boolean;
}
