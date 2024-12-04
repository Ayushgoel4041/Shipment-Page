import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Assets from "../../assets/Assets";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";
import { Box, TextField } from "@mui/material";
import OtpSkeleton from "./OtpSkeleton";
import { CiEdit } from "react-icons/ci";
import OTPInput from "react-otp-input";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CloudUpload, WatchLater } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  gstRequestOtp,
  gstValidateOtp,
  kycUpload,
} from "../../Features/gstSlice";

const VerifyGst = (props) => {
  const dispatch = useDispatch();
  const width = useCurrentWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [openUploadDocument, setOpenUploadDocument] = useState(false);
  const [isGstNumber, setIsGstNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
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
  const handleGstField = (e) => {
    const value = e.target.value;
    setIsGstNumber(value);
  };
  const handleManuallUploadClick = () => {
    setOpenUploadDocument(true);
  };

  const handleBoxClick = () => {
    document.getElementById("file-input").click();
  };
  // console.log(fileName, "this is the uploaded files");

  const handleUploadFile = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles).map((file) => file.name);
    setFileName((prev) => [...prev, ...fileArray]);
  };
  const handleUploadButton = () => {
    setFileUploaded(true);
  };
  const handleManualGstVerify = async () => {
    const clientDetails = JSON.parse(localStorage.getItem("clientData")) || {};
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
    const upload_files = fileName.map((file) => `media/clients/gst/${clientDetails?.client_id}/${currentDate}/${file}`);
  
    const data = {
      company_id: clientDetails?.company_id,
      supporting_docs: upload_files,
    };

    try {
      const gstUploadApi = await dispatch(kycUpload(data)).unwrap();
      console.log(gstUploadApi, "this is the response of gstupload api");
      props?.setIsRecharge(true);
      props?.setNext((current) => current + 1);
    } catch (error) {
      console.log(error, "this is the error");
    }
    finally{
      handleClose()
    }
  };
  const handleOtpRequest = async () => {
    if (isGstNumber.length > 0) {
      const data = {
        gst_number: isGstNumber,
      };
      setLoading(false); //true ayegi yhn
      setVerifyOtp(true);

      try {
        const requestOtp = await dispatch(gstRequestOtp(data)).unwrap();
        console.log(requestOtp, "this is the response of request otp ");
      } catch (error) {
        console.log(error, "this is the error od request otp ");
        setVerifyOtp(false);
      } finally {
        setLoading(false);
      }
    } else {
      setIsError(true);
    }
  };
  const handleCloseOtpComponent = () => {
    setVerifyOtp(false);
    setIsGstNumber("");
  };
  const handleOtpValidate = async (otp) => {
    setOtp(otp);
    if (otp.length === 6) {
      const userData = {
        otp: otp,
      };

      try {
        const validData = await dispatch(gstValidateOtp(userData)).unwrap();
        console.log(validData, "this is the respinse of valid data");
        props?.setIsRecharge(true);
        props?.setNext((current) => current + 1);
        handleClose();
      } catch (error) {
        console.log("this is validatied otp", error);
        props?.setNext(2);
      }
    }
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
            <CloseIcon onClick={handleClose} />
          </div>
        )}
        <img
          src={Assets.SRCargoBlackLogo}
          alt="Sr Cargo Black Logo"
          className="full-image-size-style"
        />
      </div>
      <Box>
        {!verifyOtp && <div className="form-title">Verify GST Number</div>}

        {verifyOtp ? (
          <>
            <div className="">
              {loading ? (
                <OtpSkeleton />
              ) : (
                <>
                  <div className="enter-otp-style ">
                    GST Number:
                    <span className="color-define"> {isGstNumber}</span>
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
                      <WatchLater sx={{ color: "#745be7" }} />
                      <span className="color-define">
                        {Math.floor(counter / 60)} min
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {/* {!openUploadDocument && ( */}
            <div style={{ margin: "20px 0px" }}>
              <TextField
                label="Enter Gst Number"
                variant="outlined"
                fullWidth
                size="medium"
                onChange={handleGstField}
                error={isError}
                sx={{
                  "& label.Mui-focused": { color: "#745be7" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#745be7" },
                    "&:hover fieldset": { borderColor: "#745be7" },
                    "&.Mui-focused fieldset": { borderColor: "#745be7" },
                  },
                }}
              />
            </div>
            <Box
              textAlign="center"
              my={1}
              style={{ display: "flex", justifycontent: "center" }}
            >
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #888",
                  width: "40%",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  margin: "0 10px",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                OR
              </span>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #888",
                  width: "40%",
                  display: "inline-block",
                }}
              />
            </Box>
            {/* )} */}

            {/* <div className="error-handling-style">{error}</div> */}
            {fileUploaded ? (
              <div>
                <span className="businessName-style">Document Uploaded: </span>
                <span>{fileName}</span>
              </div>
            ) : (
              <>
                {openUploadDocument ? (
                  <Box className="box-uploader-Style">
                    <div
                      onClick={handleBoxClick}
                      className="flex-col-center-style"
                    >
                      <div>
                        <CloudUpload style={{ fontSize: "60px" }} />
                      </div>
                      <div>
                        <input
                          type="file"
                          id="file-input"
                          style={{ display: "none" }}
                          onChange={handleUploadFile}
                          multiple
                        />
                      </div>
                      {fileName?.length > 0 ? (
                        <div>
                          <div className="uploaded-file-text-style">
                            <span>Uploaded File:</span>{" "}
                            <span style={{ color: "#745be7" }}>
                              <ul>
                                {fileName.map((name, index) => (
                                  <li key={index} style={{ color: "#745be7" }}>
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>Click here to upload a file</div>
                      )}
                    </div>
                    {fileName?.length > 0 && (
                      <div
                        className="upload-button font-style"
                        onClick={handleUploadButton}
                      >
                        Upload
                      </div>
                    )}
                  </Box>
                ) : (
                  <div
                    className="manually-upload-style"
                    onClick={handleManuallUploadClick}
                  >
                    Manually Upload Document{" "}
                    <span style={{ marginLeft: "7px" }}>
                      <FileUploadIcon />{" "}
                    </span>
                  </div>
                )}
              </>
            )}
            <div
              className="continue-button font-style"
              onClick={() => {
                fileUploaded ? handleManualGstVerify() : handleOtpRequest();
              }}
            >
              Continue
            </div>
          </>
        )}
        <div></div>
        <div className="detail-kyc-style">
          Enter details to Proceed for KYC and payment for Shipment from
          'location' to be shipped via "courier partner" at "INR 23".
        </div>
      </Box>
    </div>
  );
};

export default VerifyGst;
