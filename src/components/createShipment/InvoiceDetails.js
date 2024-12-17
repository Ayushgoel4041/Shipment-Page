import React, { useEffect, useState } from "react";
import { Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import SwitchComponent from "../SwitchComponent";
import Assets from "../../assets/Assets";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import ValueAddedService from "./ValueAddedService";
import CustomSwitch from "../CustomSwitch";
const InvoiceDetails = (props) => {
  const [packageFieldValidation, setPackageFieldValidation] = useState({});

  const [isCm, setIsCm] = useState(false);
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

  useEffect(() => {
    setPackageDataList((prevData) => {
      const updatedData = prevData.map((item) => ({
        ...item,
        dimension: isCm ? "inch" : "cm",
      }));

      // Update localStorage immediately when dimension changes
      localStorage.setItem("PackageDetails", JSON.stringify(updatedData));

      return updatedData;
    });
  }, [isCm]);

  const [invoiceAmount, setInvoiceAmount] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("InvoiceDetails"));
    return storedData ? storedData : { invoiceNumber: "", invoiceAmount: "" };
  });
  // useEffect(() => {
  //   const storedInvoiceData =
  //     JSON.parse(localStorage.getItem("InvoiceDetails")) || {};
  //   if (Object?.keys(storedInvoiceData)?.length > 0) {
  //     setInvoiceAmount(storedInvoiceData);
  //   }
  // }, []);
  useEffect(() => {
    const totalBoxes = packageDataList.reduce((total, packageDataList) => {
      const boxes = parseInt(packageDataList.no_of_boxes, 10) || 0;
      return total + boxes;
    }, 0);
    setInvoiceAmount((prevData) => ({
      ...prevData,
      totalQuantity: totalBoxes,
    }));
  }, [packageDataList]);

  const field = [
    { name: "no_of_boxes", label: "Boxes" },
    { name: "weight", label: "Weight" },
    { name: "length", label: "Length" },
    { name: "height", label: "Height" },
    { name: "width", label: "Width" },
  ];

  useEffect(() => {
    localStorage.setItem("PackageDetails", JSON.stringify(packageDataList));
    localStorage.setItem("InvoiceDetails", JSON.stringify(invoiceAmount));
  }, [packageDataList, invoiceAmount, isCm]);

  const handleAddField = () => {
    setPackageDataList([
      ...packageDataList,
      {
        no_of_boxes: "",
        weight: "",
        dimension: "",
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
          props?.isMobile
            ? "card-style"
            : props?.fieldValidation?.pickupFieldAddress
            ? "card-style"
            : "card-style-disable"
        }
      >
        <div
          className={
            props?.isMobile
              ? "Heading-style"
              : props?.fieldValidation?.pickupFieldAddress
              ? "Heading-style"
              : "Heading-style font-disable-color"
          }
        >
          Package Details
        </div>
        <div className="package_details_style">
          {!props?.isMobile && (
            <div className="justify-center-style">
              {/* <div className="box-image-style"> */}
              <div>
                <img
                  src={Assets.boxImage}
                  alt="box image"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
            </div>
          )}
          <div className="display-flex-col">
            {/* <div className="box-below-content">
              <div
                className={
                  props?.fieldValidation?.pickupFieldAddress
                    ? "box-content-head-style"
                    : "box-content-head-style font-disable-color"
                }
              >
                 Total Boxes:{invoiceAmount?.totalQuantity} 
              </div>
              
            </div> */}
            <div
              className={
                props?.fieldValidation?.pickupFieldAddress
                  ? "displayFlexBox"
                  : "displayFlexBox font-disable-color"
              }
            >
              <CustomSwitch isCm={isCm} setIsCm={setIsCm} />
            </div>

            {packageDataList?.map((data, index) => (
              <div key={index} className="display-flex-row">
                <div className="measure-data-style">
                  <div className="data1-style">
                    {field?.slice(0, 2)?.map((dataField, fieldIndex) => (
                      <TextField
                        key={fieldIndex}
                        label={dataField.label}
                        variant="outlined"
                        size="small"
                        name={dataField.name}
                        value={data[dataField.name]}
                        className={
                          dataField.name === "no_of_boxes"
                            ? "box-input-width"
                            : "weight-full-width-style"
                        }
                        error={props?.fieldValidation[dataField?.name]}
                        disabled={
                          !props?.fieldValidation?.pickupFieldAddress &&
                          props?.fieldValidation?.courier
                        }
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
                    ))}
                  </div>
                  <div className="data2-style">
                    {field?.slice(2)?.map((dataField, fieldIndex) => (
                      <div key={fieldIndex} className="display-flex-style">
                        <TextField
                          label={dataField.label}
                          variant="outlined"
                          size="small"
                          name={dataField.name}
                          value={data[dataField.name] || ""}
                          error={props?.fieldValidation[dataField?.name]}
                          onChange={(e) => handleInputChange(index, e)}
                          disabled={
                            !props?.fieldValidation?.pickupFieldAddress &&
                            props?.fieldValidation?.courier
                          }
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

                        {fieldIndex < 2 && (
                          <div
                            style={
                              props?.isMobile
                                ? { margin: "0px 5px" }
                                : { margin: "0px 10px 0px 30px" }
                            }
                          >
                            ×
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="action-button-add-remove">
                  {packageDataList.length > 1 && (
                    <div className="remove-box-measure-style">
                      <RemoveCircleRoundedIcon
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
            <div
              className={
                !props?.fieldValidation?.courier
                  ? "Heading-style font-size-small"
                  : props?.fieldValidation?.pickupFieldAddress
                  ? "Heading-style font-size-small"
                  : "Heading-style font-disable-color"
              }
            >
              Invoice Details
            </div>
            <Grid
              container
              className={props?.isMobile ? "invoice-detail-grid-style" : ""}
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
                  label="Number"
                  variant="outlined"
                  size="small"
                  name="invoiceNumber"
                  value={invoiceAmount.invoiceNumber || ""}
                  onChange={handleInputInvoice}
                  error={props?.fieldValidation?.invoiceNumber}
                  disabled={
                    !props?.fieldValidation?.pickupFieldAddress &&
                    props?.fieldValidation?.courier
                  }
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
                  label="Amount (INR)"
                  type="number"
                  variant="outlined"
                  size="small"
                  name="invoiceAmount"
                  value={invoiceAmount.invoiceAmount || ""}
                  onChange={handleInputInvoice}
                  error={props?.fieldValidation?.invoiceAmount}
                  disabled={
                    !props?.fieldValidation?.pickupFieldAddress &&
                    props?.fieldValidation?.courier
                  }
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
              {/* <SwitchComponent
                label={
                  "I will not be shipping the goods mentioned in the restricted goods list"
                }
                type={"IOSSwitch"}
                fontSize={"0.85rem"}
                disable={props?.fieldValidation?.pickupFieldAddress}
              /> */}
            </div>
          </div>
        </div>
        {props?.isMobile && <ValueAddedService {...props} />}
      </Card>
    </>
  );
};

export default InvoiceDetails;
