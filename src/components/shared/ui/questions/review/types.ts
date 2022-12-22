import { QuestionType } from 'src/interfaces/entities/question';

export interface ReviewQuestionProps extends QuestionType {
  handleDelete: () => void;
  isDeletable: boolean;
}
