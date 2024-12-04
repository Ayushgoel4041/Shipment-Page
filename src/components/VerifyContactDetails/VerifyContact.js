import React, { useEffect, useState } from "react";
import {
  Dialog,
  Divider,
  Drawer,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";
import { requestOtp, validateOtp } from "../../Features/OtpSlice";
import Assets from "../../assets/Assets";
import OTPInput from "react-otp-input";
import OtpSkeleton from "./OtpSkeleton";
import { CiEdit } from "react-icons/ci";
import CloseIcon from "@mui/icons-material/Close";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Cookies from "js-cookie";
import { getFramelessShipment } from "../../Features/shipmentApi";
import { Cookie } from "@mui/icons-material";

const VerifyContact = (props) => {
  const dispatch = useDispatch();
  const width = useCurrentWidth();

  const [phoneNumber, setPhoneNumber] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [openOtpComponent, setOpenOtpComponent] = useState(false);
  const loading = useSelector((state) => state.otp.loading);
  const error = useSelector((state) => state.otp.error);
  const [isMobile, setIsMobile] = useState(false);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60 * 30);

  setInterval(() => setCounter(counter - 1), 1000);

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  const handleClose = () => {
    props?.setOpenVerifyContact(!props?.openVerifyContact);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length === 10) {
      setPhoneNumber(value);
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const handleContinueButton = async () => {
    const userData = {
      mobile: phoneNumber,
    };

    try {
      await dispatch(requestOtp(userData)).unwrap();
      setOpenOtpComponent(true);
    } catch (err) {
      setDisableButton(false);
    }
  };

  const handleOtpValidate = async (otp) => {
    setOtp(otp);
    if (otp.length === 6) {
      const userData = {
        mobile: phoneNumber,
        otp: otp,
      };

      try {
        const validData = await dispatch(validateOtp(userData)).unwrap();
        props?.setUserData(validData);
        
        localStorage.setItem("clientData", JSON.stringify(validData));
        setCookieFunction("BearerToken", validData?.token);

        try {
          await dispatch(getFramelessShipment(validData)).unwrap();
        } catch (error) {
          console.log(error, "this is error if frameless tocket");
        }
        handleClose();
      } catch (error) {
        console.log("this is validatied otp", error);
      }
    }
  };

  const setCookieFunction = (cookie_key, data) => {
    const in30Minutes = new Date(new Date().getTime() + 30 * 60 * 1000);
    Cookies.set(cookie_key, data, {
      path: "/",
      expires: in30Minutes,
    });
  };
  const handleCloseOtpComponent = () => {
    setOpenOtpComponent(false);
    setPhoneNumber();
  };

  return (
    <div>
      <div
        className={
          isMobile ? "reverse-style marginStyle-login" : "marginStyle-login"
        }
      >
        {isMobile && (
          <div className="padding">
            {/* <CloseIcon onClick={handleClose} /> */}
          </div>
        )}
        <img
          src={Assets.SRCargoBlackLogo}
          alt="Sr Cargo Black Logo"
          className="full-image-size-style"
        />
      </div>
      {!openOtpComponent && <div className="form-title">Login to SR Cargo</div>}

      {openOtpComponent ? (
        <>
          {disableButton && (
            <div className="">
              {loading ? (
                <OtpSkeleton />
              ) : (
                <>
                  <div className="enter-otp-style">
                    Enter OTP sent on{" "}
                    <span className="color-define">{phoneNumber}</span>{" "}
                    <span>
                      <CiEdit
                        color="blue"
                        fontSize={"16px"}
                        onClick={() => handleCloseOtpComponent()}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                  <div className="centeralign-otp-field">
                    <OTPInput
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
                    Verification code will expire in {"  "}
                    <span className="clock-style">
                      {" "}
                      <WatchLaterIcon sx={{ color: "#745be7" }} />
                      <span className="color-define">
                        {Math.floor(counter / 60)} min
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ margin: "20px 0px" }}>
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              size="medium"
              autoFocus
              sx={{
                "& label.Mui-focused": { color: "#745be7" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#745be7" },
                  "&:hover fieldset": { borderColor: "#745be7" },
                  "&.Mui-focused fieldset": { borderColor: "#745be7" },
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
                      fontWeight: "700",
                      color: "black",
                      fontSize: "18px",
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
          <div className="error-handling-style">{error}</div>
          <div
            className={`${
              disableButton ? "continue-button" : "continue-disable-button"
            } font-style`}
            onClick={() => disableButton && handleContinueButton()}
          >
            Continue
          </div>
        </>
      )}

      <div className="detail-kyc-style">
        Enter details to Proceed for payment of Shipment from 'location' to be
        shipped via "courier partner" at "INR 23".
      </div>
    </div>
  );
};

export default VerifyContact;
