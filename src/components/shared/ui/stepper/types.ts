import { StepperProps } from '@mui/material';

interface StepProp {
  label: string;
  element: JSX.Element;
  onContinue?: () => void;
  onBack?: () => void;
  trigger?: () => void | Promise<boolean>;
  isValid?: boolean;
}

export interface StepperCustomProps extends StepperProps {
  handleEnd: () => void;
  steps: StepProp[];
}
