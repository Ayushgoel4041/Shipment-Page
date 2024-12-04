import React, { useEffect, useState } from "react";
import { Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import SwitchComponent from "../SwitchComponent";
import Assets from "../../assets/Assets";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { RemoveCircleOutlineOutlined } from "@mui/icons-material";
const InvoiceDetails = (props) => {
  const [packageFieldValidation, setPackageFieldValidation] = useState({});
  const [packageDataList, setPackageDataList] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("PackageDetails"));
    return storedData?.length
      ? storedData
      : [
          {
            no_of_boxes: "",
            dimension: "",
            weight: "",
            length: "",
            height: "",
            width: "",
          },
        ];
  });

  const [invoiceAmount, setInvoiceAmount] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("InvoiceDetails"));
    return storedData?.length
      ? storedData
      : [
          {
            invoiceNumber: "",
            invoiceAmount: "",
          },
        ];
  });

  const field = [
    { name: "no_of_boxes", label: "No. of boxes" },
    { name: "dimension", label: "Dimension In" },
    { name: "weight", label: "Weight" },
    { name: "length", label: "Length" },
    { name: "height", label: "Height" },
    { name: "width", label: "Width" },
  ];

  useEffect(() => {
    localStorage.setItem("PackageDetails", JSON.stringify(packageDataList));
    localStorage.setItem("InvoiceDetails", JSON.stringify(invoiceAmount));
  }, [packageDataList, invoiceAmount]);

  const handleAddField = () => {
    setPackageDataList([
      ...packageDataList,
      {
        no_of_boxes: "",
        dimension: "",
        weight: "",
        length: "",
        height: "",
        width: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    if (packageDataList.length > 1) {
      const updatedDataList = [...packageDataList];
      updatedDataList.splice(index, 1);
      setPackageDataList(updatedDataList);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDataList = [...packageDataList];
    updatedDataList[index][name] = value;
    setPackageDataList(updatedDataList);
    setPackageFieldValidation({});
  };

  const handleInputInvoice = (e) => {
    let { name, value } = e.target;
    setInvoiceAmount((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const isPackageValid = packageDataList.every((item) =>
      field.every(({ name }) => item[name]?.trim())
    );

    const isInvoiceValid =
      invoiceAmount?.invoiceNumber?.trim() &&
      invoiceAmount?.invoiceAmount?.trim();

    props?.setFieldValidation((prevData) => ({
      ...prevData,
      packageData: isPackageValid,
      invoiceData: isInvoiceValid,
    }));
  }, [packageDataList, invoiceAmount]);

  return (
    <>
      <Card
        className={
          props?.fieldValidation?.pickupFieldAddress
            ? "card-style"
            : "card-style-disable"
        }
      >
        {props?.isMobile && (
          <div className="top-stepper-style">{props?.steps}/3</div>
        )}
        <div
          className={
            props?.fieldValidation?.pickupFieldAddress
              ? "Heading-style"
              : "Heading-style font-disable-color"
          }
        >
          Package and Invoice Details
        </div>
        <div className="package_details_style">
          <div className="justify-center-style">
            {!props?.isMobile && (
              // <div className="box-image-style">
              <div>
                <img
                  src={Assets.boxImage}
                  alt="box image"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
            )}
          </div>
          <div className="display-flex-col">
            {/* <div className="subHeading-style">Package Details</div> */}
            {packageDataList?.map((data, index) => (
              <div key={index} className="display-flex-row">
                <div className="measure-data-style">
                  <div className="data1-style">
                    {field?.slice(0, 2)?.map((dataField, fieldIndex) =>
                      dataField.name === "dimension" ? ( 
                        <TextField
                          key={fieldIndex}
                          select
                          label={dataField.label}
                          variant="outlined"
                          size="small"
                          name={dataField.name}
                          value={data[dataField.name] || ""} // Default to empty value initially
                          className="full-width-style"
                          error={props?.fieldValidation[dataField?.name]}
                          disabled={!props?.fieldValidation?.pickupFieldAddress}
                          onChange={(e) => handleInputChange(index, e)}
                          sx={{
                            "& label.Mui-focused": { color: "#745be7" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#0000001F" },
                              "&:hover fieldset": { borderColor: "#745be7" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#745be7",
                              },
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Unit
                          </MenuItem>
                          <MenuItem value="cm">Centimeters (cm)</MenuItem>
                          <MenuItem value="inch">Inches (inch)</MenuItem>
                        </TextField>
                      ) : (
                        <TextField
                          key={fieldIndex}
                          label={dataField.label}
                          variant="outlined"
                          size="small"
                          name={dataField.name}
                          value={data[dataField.name]}
                          className="full-width-style"
                          error={props?.fieldValidation[dataField?.name]}
                          disabled={!props?.fieldValidation?.pickupFieldAddress}
                          onChange={(e) => handleInputChange(index, e)}
                          sx={{
                            "& label.Mui-focused": { color: "#745be7" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#0000001F" },
                              "&:hover fieldset": { borderColor: "#745be7" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#745be7",
                              },
                            },
                          }}
                        />
                      )
                    )}
                  </div>
                  <div className="data2-style">
                    {field?.slice(2)?.map((dataField, fieldIndex) => (
                      <TextField
                        key={fieldIndex}
                        label={dataField.label}
                        variant="outlined"
                        size="small"
                        name={dataField.name}
                        value={data[dataField.name]}
                        error={props?.fieldValidation[dataField?.name]}
                        onChange={(e) => handleInputChange(index, e)}
                        disabled={!props?.fieldValidation?.pickupFieldAddress}
                        sx={{
                          "& label.Mui-focused": { color: "#745be7" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#0000001F" },
                            "&:hover fieldset": { borderColor: "#745be7" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#745be7",
                            },
                          },
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="action-button-add-remove">
                  {packageDataList.length > 1 && (
                    <div className="remove-box-measure-style">
                      <RemoveCircleOutlineOutlined
                        sx={{ color: "#f44336", cursor: "pointer" }}
                        fontSize="medium"
                        onClick={() => handleRemoveField(index)}
                      />
                    </div>
                  )}
                  {index === packageDataList?.length - 1 && (
                    <div className="add-box-measure-style">
                      <AddCircleRoundedIcon
                        sx={{ color: "#745be7", cursor: "pointer" }}
                        fontSize="medium"
                        onClick={handleAddField}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="box-below-content">
              <Typography
                className={
                  props?.fieldValidation?.pickupFieldAddress
                    ? "box-content-head-style"
                    : "box-content-head-style font-disable-color"
                }
              >
                Total Boxes:{" "}
              </Typography>
              <Typography
                className={
                  props?.fieldValidation?.pickupFieldAddress
                    ? "box-content-head-style"
                    : "box-content-head-style font-disable-color"
                }
              >
                Chargeable Weight:
              </Typography>
            </div>

            {/* <div className="subHeading-style">Invoice Details</div> */}
            <Grid
              container
              className="invoice-detail-grid-style"
              spacing={{ lg: 5, md: 3, xs: 2 }}
            >
              <Grid
                item
                className="pickup-address-style flex-style-column"
                xs={12}
                md={6}
                lg={6}
              >
                <TextField
                  label="Invoice Number"
                  variant="outlined"
                  size="small"
                  name="invoiceNumber"
                  value={invoiceAmount.invoiceNumber}
                  onChange={handleInputInvoice}
                  error={props?.fieldValidation?.invoiceNumber}
                  disabled={!props?.fieldValidation?.pickupFieldAddress}
                  sx={{
                    "& label.Mui-focused": { color: "#745be7" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#0000001F" },
                      "&:hover fieldset": { borderColor: "#745be7" },
                      "&.Mui-focused fieldset": { borderColor: "#745be7" },
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                className="pickup-address-style flex-style-column"
                xs={12}
                md={6}
                lg={6}
              >
                <TextField
                  label="Invoice Amount(INR)"
                  type="number"
                  variant="outlined"
                  size="small"
                  name="invoiceAmount"
                  value={invoiceAmount.invoiceAmount}
                  error={props?.fieldValidation?.invoiceAmount}
                  disabled={!props?.fieldValidation?.pickupFieldAddress}
                  onChange={handleInputInvoice}
                  sx={{
                    "& label.Mui-focused": { color: "#745be7" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#0000001F" },
                      "&:hover fieldset": { borderColor: "#745be7" },
                      "&.Mui-focused fieldset": { borderColor: "#745be7" },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <div className="checkRestricted-good-style">
              <SwitchComponent
                label={
                  "I will not be shipping the goods mentioned in the restricted goods list"
                }
                type={"IOSSwitch"}
                fontSize={"0.85rem"}
                disable={props?.fieldValidation?.pickupFieldAddress}
              />
            </div>
          </div>
        </div>
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
    </>
  );
};

export default InvoiceDetails;
