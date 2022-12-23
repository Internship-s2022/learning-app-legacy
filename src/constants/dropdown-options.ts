import { GroupTypes } from 'src/interfaces/entities/group';

export const groupTypeOptions: { value: GroupTypes; label: string }[] = [
  { value: 'DEV', label: 'DEV' },
  { value: 'GENERAL', label: 'GENERAL' },
  { value: 'QA', label: 'QA' },
  { value: 'UIUX', label: 'UIUX' },
];

export const courseInternalOptions = [
  { value: 'true', label: 'Interno' },
  { value: 'false', label: 'Externo' },
];

export const courseOptionsTypeOptions = [
  { value: 'EXPRESS', label: 'Express' },
  { value: 'FULL', label: 'Full' },
];
