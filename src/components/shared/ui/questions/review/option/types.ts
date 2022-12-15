import { Option } from 'src/interfaces/entities/question';

export interface OptionsProps {
  type: 'SHORT_ANSWER' | 'PARAGRAPH' | 'DROPDOWN' | 'CHECKBOXES' | 'MULTIPLE_CHOICES';
  options: Option[];
}
