import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Assets from "../../assets/Assets";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";
import { Box, TextField } from "@mui/material";
import OtpSkeleton from "./OtpSkeleton";
import { CiEdit } from "react-icons/ci";
import OTPInput from "react-otp-input";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CloudUpload } from "@mui/icons-material";

const VerifyGst = (props) => {
  const width = useCurrentWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [openUploadDocument, setOpenUploadDocument] = useState(false);
  const [isGstNumber, setIsGstNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
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
    if (isGstNumber?.length > 0) {
      setOpenUploadDocument(true);
    } else {
      setIsError(true);
      console.log("this is displayed");
    }
  };
  const handleEdit = () => {
    setOpenUploadDocument(false);
  };
  const handleBoxClick = () => {
    document.getElementById("file-input").click();
  };
  console.log(fileName, "this is the uploaded files");

  const handleUploadFile = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles).map((file) => file.name);
    setFileName(fileArray);
  };
  const handleUploadButton = () => {
    setFileUploaded(true);
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
        {openUploadDocument ? (
          <div>
            <span className="businessName-style">GST Number: </span>
            <span>{isGstNumber}</span>
            <CiEdit onClick={handleEdit} style={{ cursor: "pointer" }} />
          </div>
        ) : (
          <div className="form-title">Verify GST Number</div>
        )}

        {false ? (
          <>
            {/* {disableButton && (
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
                      <WatchLater sx={{ color: "#745be7" }} />
                      <span className="color-define">
                        {Math.floor(counter / 60)} min
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
          )} */}
          </>
        ) : (
          <>
            {!openUploadDocument && (
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
            )}

            {/* <div className="error-handling-style">{error}</div> */}
            {fileUploaded ? (
              <div>
                <span className="businessName-style">Document Uploaded:   </span>
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
                        />
                      </div>
                      {fileName?.length > 0 ? (
                        <div>
                          <div className="uploaded-file-text-style">
                            <span>Uploaded File:</span>{" "}
                            <span style={{ color: "#745be7" }}>
                              {fileName.join(" , ")}
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
            {fileUploaded && (
              <div className="continue-button font-style">Continue</div>
            )}
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
