import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  TextField,
  Divider,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import SwitchComponent from "../SwitchComponent";
import { useDispatch, useSelector } from "react-redux";
import { shipmentCharge } from "../../Features/shipmentApi";
import CircularProgress from "@mui/material/CircularProgress";
import { showSnackbar } from "../SnackbarComponent";
import {
  createFromWarehouse,
  createToWarehouse,
  createOrderApi,
} from "../../Features/shipmentOrderApi";

import moment from "moment/moment";

const ValueAddedService = (props) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [valueAddedService, setValueAddedService] = useState({
    secureShipment: false,
    appointmentDelivery: false,
    poNumber: false,
  });
  const framelessData = useSelector(
    (state) => state.shipmentApi.userFramelessData
  );
  const [loading, setLoading] = useState(false);
  const [fromWarehouseData, setFromWarehouseData] = useState();
  const [toWarehouseData, setToWarehouseData] = useState();
  const [formValues, setFormValues] = useState({
    amount: "",
    appointmentDate: "",
    poNumber: "",
  });
  const [pickupDate, setPickupDate] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
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
  const clientData = JSON.parse(localStorage.getItem("clientData")) || {};
  const pickupAddress = JSON.parse(localStorage.getItem("pickupAddress")) || {};
  const destinationAddress =
    JSON.parse(localStorage.getItem("destinationAddress")) || {};
  const packageData = JSON.parse(localStorage.getItem("PackageDetails")) || [
    {},
  ];
  const invoiceData = JSON.parse(localStorage.getItem("InvoiceDetails")) || {};
  const fromAddress = JSON.parse(localStorage.getItem("fromAddress")) || {};
  const toAddress = JSON.parse(localStorage.getItem("toAddress")) || {};

  const valueAddedData = {
    is_insured: valueAddedService?.secureShipment,
    is_appointment_taken: valueAddedService?.appointmentDelivery,
  };

  const handleNext = async () => {
    setLoading(true);
    await createPickupWarehouse();
  };

  const createPickupWarehouse = async () => {
    const data = {
      is_frameless: true,
      name: pickupAddress?.warehouseName,
      client_id: parseInt(framelessData?.client_id),
      address: {
        address_line_1: pickupAddress?.pickupAddress,
        address_line_2: pickupAddress?.pickupAddress2 || "",
        pincode: pickupAddress?.sourcePincode,
        city: fromAddress?.city,
        state: fromAddress?.state,
        country: "India",
      },
      branch_code: "",
      contact_person_name: pickupAddress?.name,
      contact_person_email: pickupAddress?.email,
      contact_person_contact_no: pickupAddress?.contactNumber,
      // for_one_time_use:
      //   props.warehouseFormType === 'destination'
      //     ? !futureUseStatus
      //     : undefined,
    };

    try {
      const fromData = await dispatch(createFromWarehouse(data)).unwrap();
      setFromWarehouseData(fromData);
      createDestinationWarehouse();
    } catch {
      setLoading(false);
      showSnackbar({
        message: "Something went wrong. Please try again!",
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const createDestinationWarehouse = async () => {
    const data = {
      is_frameless: true,
      name: destinationAddress?.warehouseName,
      client_id: parseInt(framelessData?.client_id),
      address: {
        address_line_1: destinationAddress?.deliveredAddress,
        address_line_2: destinationAddress?.deliveredAddress2 || "",
        pincode: destinationAddress?.sourcePincode,
        city: toAddress?.city,
        state: toAddress?.state,
        country: "India",
      },
      branch_code: "",
      contact_person_name: destinationAddress?.name,
      contact_person_email: destinationAddress?.email,
      contact_person_contact_no: destinationAddress?.contactNumber,
      // for_one_time_use:
      //   props.warehouseFormType === 'destination'
      //     ? !futureUseStatus
      //     : undefined,
    };

    try {
      const toData = await dispatch(createToWarehouse(data)).unwrap();
      setToWarehouseData(toData);
      createOrder();
    } catch {
      setLoading(false);
      showSnackbar({
        message: "Something went wrong. Please try again!",
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const getDate = () => {
    let _date = moment();
    let sunday = moment().day("Sunday");
    if (_date.isSame(sunday)) {
      setPickupDate(moment(_date).add(1, "day"));
    } else {
      setPickupDate(_date);
    }
    setInvoiceDate(_date);
  };

  const createOrder = async () => {
    getDate();
    let pickupTimeFormatted = moment(moment().add(3, "minutes"), "hh:mm A");

    const data = {
      is_frameless: true,
      client_id: parseInt(framelessData?.client_id),
      from_warehouse_id: parseInt(fromWarehouseData?.id),
      sender_contact_person_name: fromWarehouseData?.contact_person_name,
      sender_contact_person_contact_no:
        fromWarehouseData?.contact_person_contact_no,
      sender_contact_person_email: fromWarehouseData?.contact_person_email,
      pickup_date_time: moment(`${pickupDate} ${pickupTimeFormatted}`).format(
        "YYYY-MM-DD HH:mm"
      ),
      packaging_unit_details: packageData?.map((pkg) => ({
        units: pkg?.no_of_boxes || 0,
        length: pkg?.length || 0,
        height: pkg?.height || 0,
        weight: pkg?.weight || 0,
        width: pkg?.width || 0,
        unit: pkg?.dimension || "",
      })),
      invoice_value: parseFloat(invoiceData?.invoiceAmount),
      to_warehouse_id: parseInt(toWarehouseData?.id),
      recipient_contact_person_name: toWarehouseData?.contact_person_name,
      recipient_contact_person_email: toWarehouseData?.contact_person_email,
      recipient_contact_person_contact_no:
        toWarehouseData?.contact_person_contact_no,
      no_of_units: parseInt(invoiceData?.totalUnit),
      invoice_number: invoiceData?.invoiceNumber || undefined,
      is_insured: valueAddedData?.is_insured || false,
      is_appointment_taken: valueAddedData?.is_appointment_taken,
      is_created_via_clone: false,
      invoice_date: moment(invoiceDate).format("YYYY-MM-DD"),
      mode_name: "surface", //initial value
      cod_payment_mode: "cash", //intial valwu
      is_to_pay: false, //intial valwu
      is_cod: false, //intial valwu

      // cheque_in_favor_of: cheque_in_favor_of,
      // cod_amount: codCheck ? cod_val : 0,
      // package_content: packageValue,
      // supporting_docs: invoiceDocs,
      // is_auto_assign: autoAssignCheck || false,
      // delivery_slots: selected_shipment_delivery_slots,
      // secure_shipment_detail: secureShipmentdata,
      // props.location.pathname === "/client/clone-shipment" ? true : false, /........................value of above cmnted key
      // pickup_slots: source_warehouse_pickup_slots,
      // pickup_appointment_date:
      //   appointment_pickup_date && typeof appointment_pickup_date == "object"
      //     ? appointment_pickup_date[0]
      //     : appointment_pickup_date,
    };
    try {
      await dispatch(createOrderApi(data)).unwrap();
      callChargeApi();
    } catch {
      setLoading(false);
      showSnackbar({
        message: "Something went wrong. Please try again!",
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const callChargeApi = async () => {
    localStorage.setItem("valueAddedData", JSON.stringify(valueAddedData));

    const data = {
      is_insured: valueAddedService?.secureShipment,
      is_to_pay: false,
      is_cod: false,
      is_appointment_taken: valueAddedService?.appointmentDelivery,
      calculator_page: "true",
      from_pincode: pickupAddress?.sourcePincode,
      from_city: fromAddress?.city || "noida",
      from_state: fromAddress?.state || "uttarpradesh",
      to_pincode: destinationAddress?.sourcePincode,
      to_city: toAddress?.city || "greaternoida",
      to_state: toAddress?.state || "delhi",
      quantity: invoiceData?.totalQuantity || 0,
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
      await dispatch(shipmentCharge(data)).unwrap();
      props?.setNext(2);
    } catch (error) {
      showSnackbar({
        message: "Something went wrong. Please try again!",
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                {valueAddedService?.secureShipment && props?.isMobile && (
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
                      error={
                        valueAddedService.secureShipment && !formValues.amount
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                )}

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
                {valueAddedService?.appointmentDelivery && props?.isMobile && (
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
                {valueAddedService?.poNumber && props?.isMobile && (
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
                {!props?.isMobile && (
                  <>
                    {valueAddedService?.secureShipment && (
                      <div className="switchComponent-style">
                        <div className="value-added-text-input">
                          Enter Amount:
                        </div>
                        <TextField
                          label="Enter Amount"
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={textFieldStyles}
                          name="amount"
                          value={formValues.amount}
                          error={
                            valueAddedService.secureShipment &&
                            !formValues.amount
                          }
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    {valueAddedService?.appointmentDelivery && (
                      <div className="switchComponent-style">
                        <div className="value-added-text-input">
                          Select Date:
                        </div>
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

                    {valueAddedService?.poNumber && (
                      <div className="switchComponent-style">
                        <div className="value-added-text-input">Enter PO:</div>
                        <TextField
                          label="Enter PO"
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={textFieldStyles}
                          name="poNumber"
                          error={
                            valueAddedService.poNumber && !formValues.poNumber
                          }
                          value={formValues.poNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </>
                )}
              </Grid>
            </Grid>

            {props?.isMobile && (
              <div className="click-on-page">
                {props?.steps !== 1 && (
                  <div
                    className="back-click-on-page"
                    onClick={() => props?.steps > 1 && props?.handleBackStep()}
                  >
                    Back
                  </div>
                )}
                {props?.steps !== 3 && (
                  <div
                    className="next-click-on-page"
                    onClick={() => props?.steps < 3 && props?.handleNextStep()}
                  >
                    Next
                  </div>
                )}
              </div>
            )}
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
        </>
      )}
    </div>
  );
};

export default ValueAddedService;
