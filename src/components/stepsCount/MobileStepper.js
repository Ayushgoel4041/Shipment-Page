import React, { useState, useEffect } from "react";
import Stepper from "react-stepper-horizontal";

const MobileStepper = ({ setSteps, steps = 4 }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(steps - 1);
  }, [steps]);

  const stepConfig = Array.from({ length: 4 }, (_, index) => ({
    title: `Step ${index + 1}`,
    label: `Step ${index + 1}`,
    style: { fontWeight: 'bold' }
  }));

  return (
    <div>
      <Stepper
        steps={stepConfig}
        activeStep={activeStep}
        size={30}
        circleTop={25}
        activeColor={'#06064d'}
        completeColor={'#06064d'}
        titleFontSize={13}
        onStepClick={(step) => setActiveStep(step)}
      />
    </div>
  );
};

export default MobileStepper;
