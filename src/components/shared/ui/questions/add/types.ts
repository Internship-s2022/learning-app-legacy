import { QuestionType } from 'src/interfaces/entities/question';
import { RegistrationFormType } from 'src/interfaces/entities/registration-form';

export interface AddQuestionProps {
  registrationForm: RegistrationFormType;
  viewId: string;
}

export interface QuestionsForm {
  questions: QuestionType[];
}
