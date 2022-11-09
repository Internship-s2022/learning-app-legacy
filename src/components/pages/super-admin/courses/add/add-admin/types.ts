import { SelectedUsers } from '../types';

export interface AddAdminProps {
  selectedAdmins: SelectedUsers[];
  setSelectedAdmins: React.Dispatch<React.SetStateAction<SelectedUsers[]>>;
}
