import { GroupTypes } from 'src/interfaces/entities/group';

export const groupTypeOptions: { value: GroupTypes; label: string }[] = [
  { value: 'DEV', label: 'DEV' },
  { value: 'GENERAL', label: 'GENERAL' },
  { value: 'QA', label: 'QA' },
  { value: 'UIUX', label: 'UIUX' },
];
