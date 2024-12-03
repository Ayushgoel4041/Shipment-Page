import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  TextField,
  Divider,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SwitchComponent from "../SwitchComponent";
import { useDispatch } from "react-redux";
import { shipmentCharge } from "../../Features/shipmentApi";

const ValueAddedService = (props) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [valueAddedService, setValueAddedService] = useState({
    secureShipment: false,
    appointmentDelivery: false,
    poNumber: false,
  });

  const [formValues, setFormValues] = useState({
    amount: "",
    appointmentDate: "",
    poNumber: "",
  });

  const width = window.innerWidth;

  useEffect(() => {
    setIsMobile(width < 900);
  }, [width]);

  const textFieldStyles = {
    "& label.Mui-focused": { color: "#745be7" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#0000001F" },
      "&:hover fieldset": { borderColor: "#745be7" },
      "&.Mui-focused fieldset": { borderColor: "#745be7" },
    },
  };

  // Handle switch toggle
  const handleToggle = (field) => {
    setValueAddedService((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    const pickupAddress =
      JSON.parse(localStorage.getItem("pickupAddress")) || {};
    const destinationAddress =
      JSON.parse(localStorage.getItem("destinationAddress")) || {};
    const packageData = JSON.parse(localStorage.getItem("PackageDetails")) || [
      {},
    ];
    const invoiceData =
      JSON.parse(localStorage.getItem("InvoiceDetails")) || {};

    const data = {
      is_insured: valueAddedService?.secureShipment,
      is_to_pay: false,
      is_cod: false,
      is_appointment_taken: valueAddedService?.appointmentDelivery,
      calculator_page: "true",
      from_pincode: pickupAddress?.sourcePincode,
      from_city: pickupAddress?.city || "noida",
      from_state: pickupAddress?.state || "uttarpradesh", 
      to_pincode: destinationAddress?.sourcePincode,
      to_city: destinationAddress?.city || "greaternoida",
      to_state: destinationAddress?.state || "delhi",
      quantity: packageData?.total || 10,
      invoice_value: invoiceData?.invoiceAmount || 0,
      packaging_unit_details: packageData?.map((pkg) => ({
        units: pkg?.no_of_boxes || 0,
        length: pkg?.length || 0,
        height: pkg?.height || 0,
        weight: pkg?.weight || 0,
        width: pkg?.width || 0,
        unit: pkg?.dimension || "",
      })),
    };

    try {
      const chargesResponse = await dispatch(shipmentCharge(data)).unwrap();
      console.log(chargesResponse, "This is charge response");
      props?.setNext((current) => current + 1);
    } catch (error) {
      console.log(error, "This is the error of shipment charges");
    }
  };

  return (
    <div>
      <Card
        className={
          props?.fieldValidation?.packageData &&
          props?.fieldValidation?.invoiceData
            ? "card-style"
            : "card-style-disable"
        }
      >
        {props?.isMobile && (
          <div className="top-stepper-style">{props?.steps}/3</div>
        )}
        <div
          className={
            props?.fieldValidation?.packageData &&
            props?.fieldValidation?.invoiceData
              ? "Heading-style"
              : "Heading-style font-disable-color"
          }
        >
          Value Added Services
        </div>
        <Grid container spacing={2} className="grid-container-box">
          <Grid
            item
            className="flex-style-value"
            lg={5.5}
            md={5.5}
            sm={12}
            xs={12}
          >
            <div className="switchComponent-style">
              <div
                className={
                  props?.fieldValidation?.packageData &&
                  props?.fieldValidation?.invoiceData
                    ? "value-added-text"
                    : "value-added-text font-disable-color"
                }
              >
                Secure Shipment:
              </div>
              <SwitchComponent
                type="IOSSwitch"
                onChange={() => handleToggle("secureShipment")}
                disable={
                  props?.fieldValidation?.packageData &&
                  props?.fieldValidation?.invoiceData
                }
              />
            </div>
            <div className="switchComponent-style">
              <div
                className={
                  props?.fieldValidation?.packageData &&
                  props?.fieldValidation?.invoiceData
                    ? "value-added-text"
                    : "value-added-text font-disable-color"
                }
              >
                Appointment Delivery:
              </div>
              <SwitchComponent
                type="IOSSwitch"
                onChange={() => handleToggle("appointmentDelivery")}
                disable={
                  props?.fieldValidation?.packageData &&
                  props?.fieldValidation?.invoiceData
                }
              />
            </div>
            <div className="switchComponent-style">
              <div
                className={
                  props?.fieldValidation?.packageData &&
                  props?.fieldValidation?.invoiceData
                    ? "value-added-text"
                    : "value-added-text font-disable-color"
                }
              >
                PO Number:
              </div>
              <SwitchComponent
                type="IOSSwitch"
                onChange={() => handleToggle("poNumber")}
                disable={
                  props?.fieldValidation?.packageData &&
                  props?.fieldValidation?.invoiceData
                }
              />
            </div>
          </Grid>

          <Grid
            item
            lg={1}
            md={1}
            sm={12}
            xs={12}
            style={{
              display: isMobile ? "block" : "flex",
              margin: isMobile && "10px 0px 30px",
            }}
          >
            <Divider orientation={isMobile ? "horizontal" : "vertical"} />
          </Grid>

          <Grid
            item
            className="flex-style-value"
            lg={5.5}
            md={5.5}
            sm={12}
            xs={12}
          >
            {valueAddedService.secureShipment && (
              <div className="switchComponent-style">
                <div className="value-added-text-input">Enter Amount:</div>
                <TextField
                  label="Enter Amount"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={textFieldStyles}
                  name="amount"
                  value={formValues.amount}
                  error={valueAddedService.secureShipment && !formValues.amount}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {valueAddedService.appointmentDelivery && (
              <div className="switchComponent-style">
                <div className="value-added-text-input">Select Date:</div>
                <TextField
                  variant="outlined"
                  type="date"
                  fullWidth
                  size="small"
                  sx={textFieldStyles}
                  name="appointmentDate"
                  value={formValues.appointmentDate}
                  error={
                    valueAddedService.appointmentDelivery &&
                    !formValues.appointmentDate
                  }
                  onChange={handleInputChange}
                />
              </div>
            )}

            {valueAddedService.poNumber && (
              <div className="switchComponent-style">
                <div className="value-added-text-input">Enter PO:</div>
                <TextField
                  label="Enter PO"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={textFieldStyles}
                  name="poNumber"
                  error={valueAddedService.poNumber && !formValues.poNumber}
                  value={formValues.poNumber}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Card>
      <div className="text-center">
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          className="privacy-policy-style"
          label="By procedding you agree to SR Cargo's Terms Of Service and Privacy Policy."
          sx={{
            "& .MuiFormControlLabel-label": {
              textAlign: "left",
              fontSize: "16px",
              fontWeight: "700",
              color: "black",
            },
          }}
        />
        <div className="save-select-courier-div">
          {props?.fieldValidation?.packageData &&
          props?.fieldValidation?.invoiceData &&
          props?.fieldValidation?.pickupFieldAddress ? (
            <div onClick={handleNext} className="save-select-button">
              Save and Select Courier
            </div>
          ) : (
            <div className="save-select-button save-select-button-disable">
              Save and Select Courier
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValueAddedService;
