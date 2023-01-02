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

export const questionOptions = [
  {
    label: 'Seleccione un tipo',
    value: ' ',
  },
  {
    label: 'Dropdown',
    value: 'DROPDOWN',
  },
  {
    label: 'Short answer',
    value: 'SHORT_ANSWER',
  },
  {
    label: 'Paragraph',
    value: 'PARAGRAPH',
  },
  {
    label: 'Checkbox',
    value: 'CHECKBOXES',
  },
  {
    label: 'Multiple choice',
    value: 'MULTIPLE_CHOICES',
  },
];

export const stateOptions = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'IN_PROGRESS', label: 'En Progreso' },
  { value: 'COMPLETED', label: 'Completado' },
];

export const typeOptions = [
  { value: 'DEV', label: 'Dev' },
  { value: 'QA', label: 'Qa' },
  { value: 'UIUX', label: 'UIUX' },
  { value: 'GENERAL', label: 'General' },
];
