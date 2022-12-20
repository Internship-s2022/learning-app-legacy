import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Group } from 'src/interfaces/entities/group';

export interface AddGroupProps {
  controlAddInfo: Control<Group>;
  handleSubmitAddInfo: UseFormHandleSubmit<Group>;
  onSubmitAddInfo: (data: Group) => void;
}
