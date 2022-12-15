export interface StartIconProps {
  questionType: 'SHORT_ANSWER' | 'PARAGRAPH' | 'DROPDOWN' | 'CHECKBOXES' | 'MULTIPLE_CHOICES';
  index: number;
  disabled?: boolean;
}
