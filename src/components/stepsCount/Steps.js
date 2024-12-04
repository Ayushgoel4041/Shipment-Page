import { Card, Typography } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Assets from "../../assets/Assets";

const Steps = ({ next, setNext }) => {
  const renderStep = (step, label, disableImageSrc, enableImageSrc) => {
    return (
      <div
        onClick={() => handleClickSteps(step)}
        className="step-item"
        style={{ cursor: next >= step && next !== 4 ? "pointer" : "not-allowed" }}
      >
        <div>
          <img
            src={next >= step ? enableImageSrc : disableImageSrc}
            // alt={`Step ${step}`}
          />
        </div>
        <div className={next >= step ? "enableContent" : "disableContent"}>
          {label}
        </div>
      </div>
    );
  };

  const handleClickSteps = (step) => {
    if (step < next && next !== 4) {
      setNext(step);
    }
  };

  const renderArrow = (currentStep, nextStep) => {
    return (
      <KeyboardDoubleArrowRightIcon
        className="next-step-icon"
        fontSize="large"
        sx={{
          color: next === nextStep ? "white" : "grey",
          transition: "color 0.4s ease",
        }}
      />
    );
  };

  return (
    <Card className="steps-card-style">
      <div className="steps-main-div">
        {renderStep(
          1,
          "Create Shipment",
          Assets.UnselectCreateShipment,
          Assets.selectCreateShipment
        )}
        <div>{renderArrow(1, 2)}</div>

        {renderStep(
          2,
          "Select Courier",
          Assets.UnselectSelectCourier,
          Assets.SelectCourier
        )}
        <div>{renderArrow(2, 3)}</div>

        {renderStep(
          3,
          "Make Payment",
          Assets.UnselectMakePayment,
          Assets.selectMakePayment
        )}
        <div>{renderArrow(3, 4)}</div>

        {renderStep(
          4,
          "Ship Parcel",
          Assets.UnselectShipParcel,
          Assets.SelectShiparcel
        )}
      </div>
    </Card>
  );
};

export default Steps;
