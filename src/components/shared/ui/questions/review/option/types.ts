import { Option, QuestionTypes } from 'src/interfaces/entities/question';

export interface OptionsProps {
  type: QuestionTypes;
  options: Option[];
}
