import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Group } from 'src/interfaces/entities/group';

export interface AddGroupProps {
  controlAddGroup: Control<Group>;
  handleSubmitAddName: UseFormHandleSubmit<Group>;
  onSubmitAddName: (data: Group) => void;
}
