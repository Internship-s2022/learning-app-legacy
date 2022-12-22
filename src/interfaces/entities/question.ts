export interface Option {
  _id?: string;
  value: string;
}

export type QuestionTypes =
  | 'SHORT_ANSWER'
  | 'PARAGRAPH'
  | 'DROPDOWN'
  | 'CHECKBOXES'
  | 'MULTIPLE_CHOICES';

export interface QuestionType {
  _id?: string;
  key?: string;
  title: string;
  type: QuestionTypes;
  options: Option[];
  view: string;
  isRequired: boolean;
}
