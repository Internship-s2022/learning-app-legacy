import { SelectedUsers } from 'src/interfaces/entities/course';

export interface AddAdminProps {
  selectedAdmins: SelectedUsers[];
  setSelectedAdmins: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
}
