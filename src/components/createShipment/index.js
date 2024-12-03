import React, { useEffect, useState } from "react";
import DeliveryDetails from "./DeliveryDetails";
import InvoiceDetails from "./InvoiceDetails";
import ValueAddedService from "./ValueAddedService";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";

const CreateShipment = (props) => {
  const [steps, setSteps] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({
    packageData: false,
    invoiceData: false,
    pickupFieldAddress: false,
  });
  const width = useCurrentWidth();
  useEffect(() => {
    console.log(fieldValidation, "this is the field validation in the system");
  }, [fieldValidation]);

  const handleNextStep = () => {
    setSteps((current) => current + 1);
  };

  const handleBackStep = () => {
    setSteps((current) => current - 1);
  };
  useEffect(() => {
    if (width < 850) setIsMobile(true);
    else setIsMobile(false);
  }, [width]);

  return (
    <div className="background-color-info-head">
      {isMobile ? (
        <>
          {steps === 1 && (
            <DeliveryDetails
              isMobile={isMobile}
              setSteps={setSteps}
              steps={steps}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              fieldValidation={fieldValidation}
              setFieldValidation={setFieldValidation}
            />
          )}
          {steps === 2 && (
            <InvoiceDetails
              isMobile={isMobile}
              setSteps={setSteps}
              steps={steps}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              fieldValidation={fieldValidation}
              setFieldValidation={setFieldValidation}
            />
          )}
          {steps === 3 && (
            <ValueAddedService
              isMobile={isMobile}
              setSteps={setSteps}
              steps={steps}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}
              fieldValidation={fieldValidation}
              setFieldValidation={setFieldValidation}
              {...props}
            />
          )}
        </>
      ) : (
        <>
          <DeliveryDetails
            isMobile={isMobile}
            fieldValidation={fieldValidation}
            setFieldValidation={setFieldValidation}
          />
          <InvoiceDetails
            isMobile={isMobile}
            fieldValidation={fieldValidation}
            setFieldValidation={setFieldValidation}
          />
          <ValueAddedService
            isMobile={isMobile}
            fieldValidation={fieldValidation}
            setFieldValidation={setFieldValidation}
            {...props}
          />
        </>
      )}
    </div>
  );
};

export default CreateShipment;
