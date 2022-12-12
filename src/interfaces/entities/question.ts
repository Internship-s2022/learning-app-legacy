export interface Option {
  value: string;
}
export interface QuestionType {
  _id?: string;
  title: string;
  type: 'SHORT_ANSWER' | 'PARAGRAPH' | 'DROPDOWN' | 'CHECKBOXES' | 'MULTIPLE_CHOICES';
  options: Option[];
  view: string;
  isRequired: boolean;
}
