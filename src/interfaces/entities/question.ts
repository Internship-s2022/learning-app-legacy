export interface Option {
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
  title: string;
  type: QuestionTypes;
  options: Option[];
  view: string;
  isRequired: boolean;
}
