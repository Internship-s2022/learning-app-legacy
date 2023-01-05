import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { GroupForm } from 'src/interfaces/entities/group';
import { ModuleType } from 'src/interfaces/entities/module';

export interface ConfirmProps {
  courseUsers: CourseUser[];
  modules: ModuleType[];
  setModules: React.Dispatch<React.SetStateAction<TransferListData[]>>;
  controlAddGroup: Control<GroupForm>;
  handleDeleteUser: (id: string) => void;
  onSubmitAddGroup: (data: GroupForm) => void;
  handleSubmitAddGroup: UseFormHandleSubmit<GroupForm>;
}
