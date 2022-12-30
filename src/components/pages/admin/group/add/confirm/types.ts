import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { Group } from 'src/interfaces/entities/group';
import { ModuleType } from 'src/interfaces/entities/module';

export interface ConfirmProps {
  courseUsers: CourseUser[];
  modules: ModuleType[];
  setModules: React.Dispatch<React.SetStateAction<TransferListData[]>>;
  controlAddGroup: Control<Group>;
  handleDeleteUser: (id: string) => void;
  onSubmitAddGroup: (data: Group) => void;
  handleSubmitAddGroup: UseFormHandleSubmit<Group>;
}
