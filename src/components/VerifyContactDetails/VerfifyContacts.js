import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Input,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { requestOtp, validateOtp } from "../../Features/OtpSlice";
import Assets from "../../assets/Assets";
import OtpSkeleton from "./OtpSkeleton";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";
import { CiEdit } from "react-icons/ci";

const VerfifyContacts = (props) => {
  const dispatch = useDispatch();
  const width = useCurrentWidth();
  const loading = useSelector((state) => state.otp.loading);
  const isOtpSent = useSelector((state) => state.otp.isOtpSent);
  const error = useSelector((state) => state.otp.error);

  const [isMobile, setIsMobile] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState();
  const [otp, setOtp] = useState("");
  const [verifyNum, setVerifyNum] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const handleClose = () => {
    props?.setOpenVerifyContact(!props?.openVerifyContact);
  };

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  const handleInputChange = async (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length === 10) {
      const userData = {
        mobile: value,
      };
      setPhoneNumber(value);
      setDisableButton(true);
      try {
        await dispatch(requestOtp(userData)).unwrap();
      } catch (error) {
        props?.setNext((current) => current + 1);
      }
    } else {
      setDisableButton(false);
    }
  };

  const ariaLabel = { "aria-label": "description" };

  const handleOtpValidate = async (otp) => {
    setOtp(otp);
    if (otp.length === 6) {
      const userData = {
        mobile: phoneNumber,
        otp: otp,
      };
      try {
        await dispatch(validateOtp(userData)).unwrap();
      } catch (error) {
        props?.setNext((current) => current + 1);
        console.log("this is validatied otp", error);
      }
    }
  };

  const verifyContactBox = () => {
    return (
      <Box className="verify-otp-box-style">
        <div className="phone-otp-space-style">
          <div className="align-sub-fields">
            <div className="center-fields">
              {disableButton ? (
                <div className="enter-otp-style">
                  Enter OTP sent on{" "}
                  <span className="color-define">{phoneNumber}</span>{" "}
                  <span>
                    <CiEdit />
                  </span>
                </div>
              ) : (
                <div>
                  <div className="enter-phone-number-style">Enter Your Phone Number</div>
                  <TextField
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    size={isMobile ? "medium" : "small"}
                    autoFocus
                    className="phone-number-field-style"
                    sx={{
                      "& label.Mui-focused": { color: "#06064d" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#06064d" },
                        "&:hover fieldset": { borderColor: "#06064d" },
                        "&.Mui-focused fieldset": { borderColor: "#06064d" },
                      },
                    }}
                    inputProps={{
                      pattern: "[0-9]*",
                      maxLength: 10,
                      onInput: handleInputChange,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: "17px",
                          }}
                        >
                          +91
                          <Divider
                            sx={{
                              height: 24,
                              margin: "0 8px",
                              backgroundColor: "black",
                            }}
                            orientation="vertical"
                            flexItem
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              )}
            </div>
            {disableButton && (
              <div className="">
                {loading ? (
                  <OtpSkeleton />
                ) : (
                  <>
                    <div className="verify-font-style margin-style">
                      Enter verification code
                    </div>
                    <div className="centeralign-otp-field">
                      <OtpInput
                        value={otp}
                        onChange={handleOtpValidate}
                        numInputs={6}
                        renderSeparator={
                          <span style={{ margin: "10px" }}> </span>
                        }
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                          border: "1px solid #06064d",
                          background: "#FFF",
                          fontSize: "20px",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        style={{ display: "block !important" }}
                      />
                    </div>

                    <div className="verify-font-style margin-style">
                      {" "}
                      Verification code will expire in 30 minutes
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="detail-kyc-style verify-font-style">
            Enter details to Proceed for KYC and payment for Shipment from
            'location' to be shipped via "courier partner" at "INR 23".
          </div>
        </div>
      </Box>
    );
  };

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={props?.openVerifyContact}
          onClose={() => handleClose()}
          PaperProps={{
            className: "drawerStyle-verify",
          }}
        >
          <div className="drawer-header-style">
            <div className="subHeading-style">Verify Contact Details</div>
            <div className="dialog-title-style">
              <CloseIcon
                onClick={() => handleClose()}
                color="action"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div>{verifyContactBox()}</div>
        </Drawer>
      ) : (
        <Dialog
          open={props?.openVerifyContact}
          onClose={handleClose}
          classes={{
            paper: "dialogWidth",
          }}
          scroll="paper"
        >
          <DialogTitle>
            <div className="dialog-title-style">
              <div className="subHeading-style">Verify Contact Details</div>
              <CloseIcon
                onClick={handleClose}
                color="action"
                style={{ cursor: "pointer" }}
              />
            </div>
          </DialogTitle>
          {verifyContactBox()}
        </Dialog>
      )}
    </>
  );
};

export default VerfifyContacts;
