import React, { useState } from "react";
import DeliveryDetails from "./DeliveryDetails";
import InvoiceDetails from "./InvoiceDetails";
import ValueAddedService from "./ValueAddedService";
import { Card, Checkbox, FormControlLabel } from "@mui/material";
const CreateShipment = (props) => {
  const [steps, setSteps] = useState(1);

  const handleNext = () => {
    props?.setNext((current) => current + 1);
  };

  const handleNextStep = () => {
    setSteps((current) => current + 1);
  };

  const handleBackStep = () => {
    setSteps((current) => current - 1);
  };

  return (
    <div className="background-color-info-head">
      <DeliveryDetails
        setSteps={setSteps}
        steps={steps}
        handleNextStep={handleNextStep}
        handleBackStep={handleBackStep}
      />
      <InvoiceDetails
        setSteps={setSteps}
        steps={steps}
        handleNextStep={handleNextStep}
        handleBackStep={handleBackStep}
      />
      <ValueAddedService
        setSteps={setSteps}
        steps={steps}
        handleNextStep={handleNextStep}
        handleBackStep={handleBackStep}
      />
      {/* <Card className="card-style"> */}
      <div className="text-center">
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          className="privacy-policy-style"
          label="By procedding you agree to SR Cargo's Terms Of Service and Privacy Policy."
          sx={{
            "& .MuiFormControlLabel-label": {
              textAlign: 'left',
              fontSize: '16px', 
              fontWeight:"700",
              color: 'black', 
            },
          }}
        />{" "}
        <div className="save-select-courier-div">
          <div onClick={handleNext} className="save-select-button">
            Save and Select Courier
          </div>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default CreateShipment;
