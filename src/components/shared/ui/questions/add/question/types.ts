import {
  Control,
  FieldValues,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface QuestionProps {
  childIndex: number;
  isEditable: boolean;
  control: Control<FieldValues, unknown>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  remove: UseFieldArrayRemove;
}
