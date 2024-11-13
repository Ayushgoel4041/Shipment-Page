import React, { useEffect, useState } from "react";
import SwitchComponent from "../SwitchComponent";
import { Card, Divider, Grid, TextField, Typography } from "@mui/material";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";

const ValueAddedService = () => {
  const [isMobile, setIsMobile] = useState(false);
  const textFieldStyles = {
    "& label.Mui-focused": { color: "#745be7" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#0000001F" },
      "&:hover fieldset": { borderColor: "#745be7" },
      "&.Mui-focused fieldset": { borderColor: "#745be7" },
    },
  };
  const width = window.innerWidth;
  useEffect(() => {
    if (width < 900) setIsMobile(true);
    else setIsMobile(false);
  }, [width]);

  return (
    <Card className="card-style">
      <div className="Heading-style">Value Added Services</div>
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
            <div className="value-added-text">Secure Shipment: </div>
            <SwitchComponent type={"IOSSwitch"} />
          </div>
          <div className="switchComponent-style">
            <div className="value-added-text">Cash on Delivery: </div>
            <SwitchComponent type={"IOSSwitch"} />
          </div>
          <div className="switchComponent-style">
            <div className="value-added-text">Appointment Delivery: </div>
            <SwitchComponent type={"IOSSwitch"} />
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
          <div className="switchComponent-style">
            <div className="value-added-text-input">Enter Amount:</div>
            <TextField
              label="Enter Amount"
              variant="outlined"
              fullWidth
              size="small"
              sx={textFieldStyles}
              // className=""
            />
          </div>
          <div className="switchComponent-style">
            <div className="value-added-text-input">Select Date:</div>
            <TextField
              variant="outlined"
              type="date"
              fullWidth
              size="small"
              sx={textFieldStyles}
            />
          </div>
          <div className="switchComponent-style">
            <div className="value-added-text-input">Enter PO:</div>
            <TextField
              label="Enter PO"
              variant="outlined"
              fullWidth
              size="small"
              sx={textFieldStyles}
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ValueAddedService;
