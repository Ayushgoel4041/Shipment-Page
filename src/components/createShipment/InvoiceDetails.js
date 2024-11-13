import React, { useEffect, useState } from "react";
import { Card, Divider, Grid, TextField, Typography } from "@mui/material";
import SwitchComponent from "../SwitchComponent";
import Assets from "../../assets/Assets";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { RemoveCircleOutlineOutlined } from "@mui/icons-material";
const InvoiceDetails = (props) => {
  const [packageDataList, setPackageDataList] = useState([
    {
      no_of_boxes: "",
      Dimension: "",
      Weight: "",
      Length: "",
      Height: "",
      Width: "",
    },
  ]);
  const [invoiceAmount, setInvoiceAmount] = useState({
    invoiceNumber: "",
    invoiceAmount: "",
  });
  // const [initialCall, setInitialCall] = useState(true);
  const field = [
    { name: "no_of_boxes", label: "No. of boxes" },
    { name: "dimension", label: "Dimension In" },
    { name: "weight", label: "Weight" },
    { name: "length", label: "Length" },
    { name: "height", label: "Height" },
    { name: "width", label: "Width" },
  ];
  // useEffect(() => {
  //   if (initialCall) {
  //     setPackageDataList(
  //       JSON.parse(localStorage.getItem("PackageDetails")) || {}
  //     );
  //     setInitialCall(false);
  //   } else {
  //     localStorage.setItem("PackageDetails", JSON.stringify(packageDataList));
  //   }
  // }, [packageDataList, initialCall]);
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
  };
  const handleInputInvoice = (e) => {
    let { name, value } = e.target;
    setInvoiceAmount((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <Card className="card-style">
      <div className="Heading-style">Package and Invoice Details</div>
      <div className="package_details_style">
        <div className="justify-center-style">
          <div className="box-image-style">
            <img src={Assets.boxImage} alt="box image" />
          </div>
        </div>
        <div className="display-flex-col">
          {/* <div className="subHeading-style">Package Details</div> */}
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
                      className="full-width-style"
                      onChange={(e) => handleInputChange(index, e)}
                      sx={{
                        "& label.Mui-focused": { color: "#745be7" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#0000001F" },
                          "&:hover fieldset": { borderColor: "#745be7" },
                          "&.Mui-focused fieldset": { borderColor: "#745be7" },
                        },
                      }}
                    />
                  ))}
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
                      onChange={(e) => handleInputChange(index, e)}
                      sx={{
                        "& label.Mui-focused": { color: "#745be7" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#0000001F" },
                          "&:hover fieldset": { borderColor: "#745be7" },
                          "&.Mui-focused fieldset": { borderColor: "#745be7" },
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
            <Typography className="box-content-head-style">
              Total Boxes:{" "}
            </Typography>
            <Typography className="box-content-head-style">
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
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceDetails;
