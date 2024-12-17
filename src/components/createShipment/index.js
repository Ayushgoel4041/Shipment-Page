import React, { useEffect, useState } from "react";
import DeliveryDetails from "./DeliveryDetails";
import InvoiceDetails from "./InvoiceDetails";
import ValueAddedService from "./ValueAddedService";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";
import MobileStepper from "../stepsCount/MobileStepper";

const CreateShipment = (props) => {
  // const [steps, setSteps] = useState(1);
  const [isMobile, setIsMobile] = useState(false);


  const width = useCurrentWidth();


  const handleNextStep = () => {
    props?.setSteps((current) => current + 1);
  };

  const handleBackStep = () => {
    props?.setSteps((current) => current - 1);
  };

  useEffect(() => {
    if (width < 850) setIsMobile(true);
    else setIsMobile(false);
  }, [width]);

  return (
    <div className="background-color-info-head">
      {isMobile ? (
        <>
          {/* <div style={{position:'fixed',left:'0',right:'0'}}>
           */}
<div>            <MobileStepper setSteps={props?.setSteps} steps={props?.steps} />
          </div>
          {(props?.steps === 1 || props?.steps === 2) && (
            <DeliveryDetails
              isMobile={isMobile}
              setSteps={props?.setSteps}
              steps={props?.steps}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              fieldValidation={props?.fieldValidation}
              setFieldValidation={props?.setFieldValidation}
            />
          )}
          {props?.steps === 3 && (
            <InvoiceDetails
              isMobile={isMobile}
              setSteps={props?.setSteps}
              steps={props?.steps}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              fieldValidation={props?.fieldValidation}
              setFieldValidation={props?.setFieldValidation}
              {...props}
            />
          )}

          {/* <ValueAddedService
            isMobile={isMobile}
            setSteps={props?.setSteps}
            steps={props?.steps}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
            fieldValidation={fieldValidation}
            setFieldValidation={setFieldValidation}
            {...props}
          /> */}
        </>
      ) : (
        <>
          <DeliveryDetails
            isMobile={isMobile}
            fieldValidation={props?.fieldValidation}
            setFieldValidation={props?.setFieldValidation}
          />
          <InvoiceDetails
            isMobile={isMobile}
            fieldValidation={props?.fieldValidation}
            setFieldValidation={props?.setFieldValidation}
          />
          <ValueAddedService
            isMobile={isMobile}
            fieldValidation={props?.fieldValidation}
            setFieldValidation={props?.setFieldValidation}
            {...props}
          />
        </>
      )}
    </div>
  );
};

export default CreateShipment;
