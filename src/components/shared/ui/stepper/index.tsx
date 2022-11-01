import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import styles from './stepper.module.css';
import { StepperCustomProps } from './types';

const HorizontalLinearStepper = ({ handleEnd, steps }: StepperCustomProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    if (steps[activeStep]?.onContinue && steps[activeStep]?.isValid)
      steps[activeStep]?.onContinue();
    if (steps[activeStep]?.trigger) {
      const isStepValid = await steps[activeStep].trigger();
      if (isStepValid) {
        if (activeStep === steps.length - 1) {
          handleEnd();
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    } else {
      if (steps[activeStep]?.isValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (steps[activeStep]?.onBack) steps[activeStep]?.onBack();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.stepperContainer}>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={step.label} {...stepProps}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box className={styles.btnContainer}>
          <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
            Volver
          </Button>
          <Button variant="contained" type="submit" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Terminar' : 'Continuar'}
          </Button>
        </Box>
      </Box>
      {steps[activeStep].element}
    </Box>
  );
};

export default HorizontalLinearStepper;
