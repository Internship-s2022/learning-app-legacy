import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { GroupForm } from 'src/interfaces/entities/group';

export interface AddGroupProps {
  controlAddInfo: Control<GroupForm>;
  handleSubmitAddInfo: UseFormHandleSubmit<GroupForm>;
  onSubmitAddInfo: (data: GroupForm) => void;
}
