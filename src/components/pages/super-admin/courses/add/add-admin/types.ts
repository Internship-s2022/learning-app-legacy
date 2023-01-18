import { SelectedUsers } from 'src/interfaces/entities/course-user';

export interface AddAdminProps {
  selectedAdmins: SelectedUsers[];
  setSelectedAdmins: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
  isValidContinueAdmin: boolean;
}
