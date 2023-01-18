import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import CustomButton from '../buttons/custom-button';
import styles from './stepper.module.css';
import { StepperCustomProps } from './types';

const HorizontalLinearStepper = ({ handleEnd, steps }: StepperCustomProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    if (steps[activeStep]?.onContinue && steps[activeStep]?.isValid !== undefined)
      steps[activeStep].onContinue();
    if (steps[activeStep]?.trigger) {
      const isStepValid = await steps[activeStep].trigger();
      if (isStepValid && steps[activeStep]?.isValid) {
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
    if (steps[activeStep]?.onBack && activeStep === 0) {
      steps[activeStep]?.onBack();
    } else setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.stepperContainer}>
        <Stepper data-testid="stepper-container" activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step
                key={step.label}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: 'secondary.main',
                  },
                }}
                data-testid={`step-${index}`}
              >
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box className={styles.btnContainer}>
          <Button data-testid="goBack-button" variant="outlined" onClick={handleBack}>
            Volver
          </Button>
          <CustomButton
            data-testid="continue-button"
            variant="contained"
            type="submit"
            onClick={handleNext}
            disabled={!steps[activeStep].isValid}
            isLoading={steps[activeStep].isLoadingStep}
          >
            {activeStep === steps.length - 1 ? 'Terminar' : 'Continuar'}
          </CustomButton>
        </Box>
      </Box>
      {steps[activeStep]?.element}
    </Box>
  );
};

export default HorizontalLinearStepper;
