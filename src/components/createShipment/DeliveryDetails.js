import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Collapse,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { TransitionGroup } from "react-transition-group";
import EditIcon from "@mui/icons-material/Edit";
import EditDeliveryDetails from "./EditDeliveryDetails";
import { useDispatch, useSelector } from "react-redux";
import { getLocationFromPincode } from "../../Features/CommonApi";
import { showSnackbar } from "../SnackbarComponent";

const DeliveryDetails = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.otp.loading);
  const error = useSelector((state) => state.otp.error);
  const [pickupLocationData, setPickupLocationData] = useState(false);
  const [destinationLocationData, setDestinationLocationData] = useState(false);
  const fields = [
    { label: "Warehouse Name", name: "warehouseName" },
    { label: "Name", name: "name" },
    { label: "Contact Number", name: "contactNumber" },
    { label: "E-mail", name: "email" },
  ];
  const [editSave, setEditSave] = useState(false);
  const [openPickupEditBox, setOpenPickupEditBox] = useState(false);
  const [openDestinationEditBox, setOpenDestinationEditBox] = useState(false);
  const [pickupAddress, setPickupAddress] = useState({});
  const [pickupPinCodeVerified, setPickupPinCodeVerified] = useState(false);
  const [confirm, setCodeConfirm] = useState(false);
  const [pickupFieldValidation, setPickupFieldValidation] = useState({});
  const [showPickupDetailedAddress, setShowPickupDetailedAddress] =
    useState(false);
  const [destinationAddress, setDestinationAddress] = useState({});
  const [destinationPinCodeVerified, setDestinationPinCodeVerified] =
    useState(false);
  const [showDestinationDetailedAddress, setShowDestinationDetailedAddress] =
    useState(false);
  const [destinationFieldValidation, setDestinationFieldValidation] = useState(
    {}
  );
  const [opendownPickup, setOpenDownPickup] = useState(false);
  const [opendownDestination, setOpenDownDestination] = useState(false);

  const [mobilePickupBox, setMobilePickupBox] = useState(true);
  const [mobileLocalStorageValue, setMobileLocalStorageValue] = useState(false);

  const handleInputPickupPincodeChange = async (e) => {
    const { name, value } = e.target;
    const pinCode = e.target.value.replace(/[^0-9]/g, "");
    setPickupAddress((prevData) => ({ ...prevData, [name]: value }));

    if (pinCode.length === 6) {
      // setPickupPinCodeVerified(true);

      try {
        const locationData = await dispatch(
          getLocationFromPincode(pinCode)
        ).unwrap();
        let reqObj = {
          city: locationData?.location[0],
          state: locationData?.location[1],
        };
        localStorage.setItem("fromAddress", JSON.stringify(reqObj));
        setPickupLocationData(true);

        setPickupPinCodeVerified(true);
      } catch (error) {
        setPickupLocationData(false);
        showSnackbar({
          message: "Invalid Pickup PinCode.Try Again",
          severity: "error",
          duration: 3000,
          position: { vertical: "top", horizontal: "right" },
        });

        setPickupPinCodeVerified(false);
      }
    } else {
      setPickupPinCodeVerified(false);
    }
  };


  
  // value to get pickup and destintion address from localstorage
  useEffect(() => {
    const storedPickupAddress =
      JSON.parse(localStorage.getItem("pickupAddress")) || {};
    if (Object?.keys(storedPickupAddress)?.length > 0) {
      setPickupAddress(storedPickupAddress);
      setShowPickupDetailedAddress(true);

      if ((storedPickupAddress?.sourcePincode).length === 6) {
        setPickupPinCodeVerified(true);
      }
    }
    const storedDestinationAddress =
      JSON.parse(localStorage.getItem("destinationAddress")) || {};
    if (Object?.keys(storedDestinationAddress)?.length > 0) {
      setDestinationAddress(storedDestinationAddress);
      setShowDestinationDetailedAddress(true);

      if ((storedDestinationAddress?.sourcePincode).length === 6) {
        setDestinationPinCodeVerified(true);
      }
    }
    if (
      Object?.keys(storedPickupAddress)?.length > 0 &&
      Object?.keys(storedDestinationAddress)?.length > 0 &&
      props?.isMobile
    ) {
      setMobileLocalStorageValue(true);
    }
  }, [editSave]);
  useEffect(() => {
    if (
      showPickupDetailedAddress &&
      showDestinationDetailedAddress &&
      props?.isMobile
    ) {
      setMobileLocalStorageValue(true);
    }
  }, [
    showPickupDetailedAddress,
    showDestinationDetailedAddress,
    props?.isMobile,
  ]);
  useEffect(() => {
    if (pickupPinCodeVerified && destinationPinCodeVerified)
      setCodeConfirm(true);
  }, [pickupPinCodeVerified, destinationPinCodeVerified]);

  const pickupHandleChange = (e) => {
    const { name, value } = e.target;
    let valid = true;

    if (name === "contactNumber") {
      const contactRegex = /^[789][0-9]{9}$/; // Starts with 7, 8, or 9, followed by 9 digits
      const invalidStart = /^[1234]/; // Checks if the number starts with 1, 2, 3, or 4

      if (invalidStart.test(value) || /[^0-9]/.test(value)) {
        setPickupFieldValidation((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        valid = false;
      } else if (!contactRegex.test(value) && value !== "") {
        setPickupFieldValidation((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        valid = false;
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|pickrr\.in)$/;
      if (!emailRegex.test(value) && value !== "") {
        setPickupFieldValidation((prevState) => ({
          ...prevState,
          [name]: "Invalid email (must be @gmail.com or @pickrr.in)",
        }));
        valid = false;
      }
    }

    if (valid) {
      setPickupAddress((prevData) => ({ ...prevData, [name]: value }));
      setPickupFieldValidation({});
    }
  };

  const handleInputDestinationPincodeChange = async (e) => {
    const { name, value } = e.target;
    const pinCode = e.target.value.replace(/[^0-9]/g, "");
    setDestinationAddress((prevData) => ({ ...prevData, [name]: value }));

    if (pinCode.length === 6) {
      try {
        const locationData = await dispatch(
          getLocationFromPincode(pinCode)
        ).unwrap();
        let reqObj = {
          city: locationData?.location[0],
          state: locationData?.location[1],
        };
        localStorage.setItem("toAddress", JSON.stringify(reqObj));
        setDestinationLocationData(true);
        setDestinationPinCodeVerified(true);
      } catch (error) {
        setDestinationLocationData(false);
        showSnackbar({
          message: "Invalid Destination PinCode.Try Again",
          severity: "error",
          duration: 3000,
          position: { vertical: "top", horizontal: "right" },
        });
        setDestinationPinCodeVerified(false);
      }
    } else {
      setDestinationPinCodeVerified(false);
    }
  };

  const destinationHandleChange = (e) => {
    const { name, value } = e.target;
    let valid = true;

    if (name === "contactNumber") {
      const contactRegex = /^[789][0-9]{9}$/; // Starts with 7, 8, or 9, followed by 9 digits
      const invalidStart = /^[1234]/; // Checks if the number starts with 1, 2, 3, or 4

      if (invalidStart.test(value) || /[^0-9]/.test(value)) {
        setDestinationFieldValidation((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        valid = false;
      } else if (!contactRegex.test(value) && value !== "") {
        setDestinationFieldValidation((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        valid = false;
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|pickrr\.in)$/;
      if (!emailRegex.test(value) && value !== "") {
        setDestinationFieldValidation((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        valid = false;
      }
    }

    if (valid) {
      setDestinationAddress((prevData) => ({ ...prevData, [name]: value }));
      setDestinationFieldValidation({});
    }
  };

  const textFieldStyles = {
    "& label": {
      color: "rgba(0, 0, 0, 0.6)",
      "&::after": { content: '"*"', color: "red", fontSize: "20px" },
    },
    "& label.Mui-focused": {
      color: "#745be7",
      "&::after": { fontSize: "28px", marginRight: "10px" },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(133,133,133)" },
      "&:hover fieldset": {
        borderColor: "#745be7",
        boxShadow: "0 2px 10px #bdafff36",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#745be7",
        boxShadow: "0 2px 10px #bdafff36",
      },
    },
  };

  const setPickUpAddressLocalStorgae = () => {
    localStorage.setItem("pickupAddress", JSON.stringify(pickupAddress));
  };
  const setDestinationAddressLocalStorage = () => {
    localStorage.setItem(
      "destinationAddress",
      JSON.stringify(destinationAddress)
    );
  };
  const handlePickupAddbutton = () => {
    let submit = true;
    if (!pickupAddress?.name) {
      setPickupFieldValidation((prevData) => ({ ...prevData, name: true }));
      submit = false;
    }
    if (!pickupAddress?.contactNumber) {
      setPickupFieldValidation((prevData) => ({
        ...prevData,
        contactNumber: true,
      }));
      submit = false;
    }
    if (!pickupAddress?.warehouseName) {
      setPickupFieldValidation((prevData) => ({
        ...prevData,
        warehouseName: true,
      }));
      submit = false;
    }
    if (!pickupAddress?.email) {
      setPickupFieldValidation((prevData) => ({ ...prevData, email: true }));
      submit = false;
    }
    if (!pickupAddress?.pickupAddress) {
      setPickupFieldValidation((prevData) => ({
        ...prevData,
        pickupAddress: true,
      }));
      submit = false;
    }
    if (!pickupAddress?.consignor_business_name) {
      setPickupFieldValidation((prevData) => ({
        ...prevData,
        consignor_business_name: true,
      }));
      submit = false;
    }
    if (!pickupLocationData) {
      setPickupFieldValidation((prevData) => ({
        ...prevData,
        fromPincode: true,
      }));
      submit = false;
    }
    if (submit) {
      setPickupAddress((prevData) => ({ ...prevData, pickupFieldValidation }));
      setShowPickupDetailedAddress(true);
      setOpenDownPickup(false);
      setPickUpAddressLocalStorgae();
      if (props?.isMobile) {
        setMobilePickupBox(false);
      }
    }
  };

  const handleDestinationPickup = () => {
    let submit = true;
    if (!destinationAddress?.name) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        name: true,
      }));
      submit = false;
    }
    if (!destinationAddress?.contactNumber) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        contactNumber: true,
      }));
      submit = false;
    }
    if (!destinationAddress?.warehouseName) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        warehouseName: true,
      }));
      submit = false;
    }
    if (!destinationAddress?.email) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        email: true,
      }));
      submit = false;
    }
    if (!destinationAddress?.deliveredAddress) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        deliveredAddress: true,
      }));
      submit = false;
    }
    if (!destinationAddress?.consignee_business_name) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        consignee_business_name: true,
      }));
      submit = false;
    }
    if (!destinationLocationData) {
      setDestinationFieldValidation((prevData) => ({
        ...prevData,
        toAddress: true,
      }));
      submit = false;
    }
    if (submit) {
      setDestinationAddress((prevData) => ({
        ...prevData,
        destinationFieldValidation,
      }));
      props?.setFieldValidation((prevData) => ({
        ...prevData,
        destinationFieldAddress: false,
      }));
      setMobileLocalStorageValue(true);
      setShowDestinationDetailedAddress(true);
      setOpenDownDestination(false);
      setDestinationAddressLocalStorage();
    }
  };
  const handleClickEditPincode = (id) => {
    if (id === 1) {
      localStorage.removeItem("pickupAddress");
      setPickupAddress({});
      setShowPickupDetailedAddress(false);
      setPickupPinCodeVerified(false);
    } else if (id === 2) {
      localStorage.removeItem("destinationAddress");
      setDestinationAddress({});
      setShowDestinationDetailedAddress(false);
      setDestinationPinCodeVerified(false);
    }
  };
  useEffect(() => {
    const isValidPickup =
      Object.keys(pickupFieldValidation).length === 0 &&
      Object.keys(pickupAddress).length !== 0;
    const isValidDestination =
      Object.keys(destinationFieldValidation).length === 0 &&
      Object.keys(destinationAddress).length !== 0;

    props?.setFieldValidation((prev) => ({
      ...prev,
      pickupFieldAddress: isValidPickup && isValidDestination,
    }));
  }, [
    pickupFieldValidation,
    destinationFieldValidation,
    pickupAddress,
    destinationAddress,
  ]);
  useEffect(() => {
    if (props?.isMobile) {
      setCodeConfirm(true);
      setOpenDownPickup(true);
      setOpenDownDestination(true);
    }
  }, [props?.isMobile]);

  const detailedPickupAddressBox = () => {
    return (
      <Box className="address-detail-box-style">
        <div>
          <div>
            <span className="businessName-style">Pickup Pincode:-</span>
            <span>{pickupAddress?.sourcePincode}</span>{" "}
          </div>
          <div className="businessName-style">
            {pickupAddress?.consignor_business_name}{" "}
          </div>
          <div className="subtext-box-style">{pickupAddress?.name}</div>
          <div className="subtext-box-style">
            {pickupAddress?.pickupAddress}
          </div>
          <div className="subtext-box-style">
            <span> Contact:- </span> {pickupAddress?.contactNumber}
          </div>
        </div>
        <div>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => setOpenPickupEditBox(true)}
          />
        </div>
      </Box>
    );
  };
  const pickupAddressbox = () => {
    return (
      <Grid
        item
        className="pickup-address-style flex-style-column"
        xs={12}
        md={6}
        lg={6}
      >
        {!showPickupDetailedAddress && (
          <>
            <TextField
              label="Source Pincode"
              variant="outlined"
              size="small"
              name="sourcePincode"
              onChange={handleInputPickupPincodeChange}
              fullWidth
              value={pickupAddress.sourcePincode || ""}
              error={pickupFieldValidation?.fromPincode}
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {pickupPinCodeVerified && (
                      <>
                        {/* <EditIcon
                  color="action"
                  fontSize="small"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickEditPincode(1)}
                />{" "} */}
                        <CheckIcon
                          color="success"
                          style={{ cursor: "pointer" }}
                        />
                      </>
                    )}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                pattern: "[0-9]*",
                maxLength: 6,
              }}
            />

            <Typography className="font1">Enter 6 digit pincode</Typography>
          </>
        )}

        {!showPickupDetailedAddress && (
          <>
            <TransitionGroup>
              {confirm && (
                <Collapse in={confirm} timeout={800}>
                  <TextField
                    label="Pickup Address"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={"4"}
                    className="inputField_style"
                    name="pickupAddress"
                    onChange={pickupHandleChange}
                    // disabled={!confirm}
                    onFocus={() => setOpenDownPickup(true)}
                    error={pickupFieldValidation?.pickupAddress}
                    sx={{
                      "& label": {
                        color: "rgba(0, 0, 0, 0.6)",
                        "&::after": {
                          content: '"*"',
                          color: "red",
                          fontSize: "20px",
                        },
                      },
                      "& label.Mui-focused": {
                        color: "#745be7",
                        "&::after": {
                          fontSize: "28px",
                          marginRight: "10px",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(108,108,108)" },
                        "&:hover fieldset": {
                          borderColor: confirm && "#745be7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: confirm && "#745be7",
                        },
                      },
                    }}
                  />
                </Collapse>
              )}
            </TransitionGroup>

            <TransitionGroup>
              {opendownPickup && (
                <Collapse in={opendownPickup} timeout={800}>
                  <TextField
                    label="Consignor Business Name"
                    variant="outlined"
                    size="small"
                    className="inputField_style"
                    name="consignor_business_name"
                    onChange={pickupHandleChange}
                    error={pickupFieldValidation?.consignor_business_name}
                    sx={textFieldStyles}
                  />
                  <div className="grid-style">
                    {fields?.map((field, index) => (
                      <TextField
                        label={field.label}
                        variant="outlined"
                        size="small"
                        className="inputField_style"
                        name={field?.name}
                        error={pickupFieldValidation[field.name]}
                        onChange={pickupHandleChange}
                        sx={textFieldStyles}
                      />
                    ))}
                  </div>
                </Collapse>
              )}
            </TransitionGroup>
            <TransitionGroup>
              {opendownPickup && (
                <Collapse in={opendownPickup} timeout={800}>
                  <div className="addDiv_Style">
                    <div
                      className="Add_Submit_button_style"
                      onClick={handlePickupAddbutton}
                    >
                      Add & Submit
                    </div>
                  </div>
                </Collapse>
              )}
            </TransitionGroup>
          </>
        )}
      </Grid>
    );
  };

  const detailedDestinationAddressBox = () => {
    return (
      <Box className="address-detail-box-style">
        <div>
          <div>
            <span className="businessName-style"> Destination Pincode:-</span>
            <span>{destinationAddress?.sourcePincode}</span>{" "}
          </div>
          <div className="businessName-style">
            {destinationAddress?.consignee_business_name}{" "}
          </div>
          <div className="subtext-box-style">{destinationAddress?.name}</div>
          <div className="subtext-box-style">
            {destinationAddress?.deliveredAddress}
          </div>
          <div className="subtext-box-style">
            <span> Contact:- </span> {destinationAddress?.contactNumber}
          </div>
        </div>
        <div>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => setOpenDestinationEditBox(true)}
          />
        </div>
      </Box>
    );
  };
  const destinationAddressBox = () => {
    return (
      <Grid
        item
        className="pickup-address-style flex-style-column"
        xs={12}
        md={6}
        lg={6}
      >
        {!showDestinationDetailedAddress && (
          <>
            <TextField
              label="Destination Pincode"
              variant="outlined"
              fullWidth
              size="small"
              name="sourcePincode"
              sx={textFieldStyles}
              value={destinationAddress.sourcePincode || ""}
              error={destinationFieldValidation?.toAddress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {destinationPinCodeVerified && (
                      <>
                        {/* EditIcon<
                        color="action"
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClickEditPincode(2)}
                      />{" "} */}
                        <CheckIcon
                          color="success"
                          style={{ cursor: "pointer" }}
                        />
                      </>
                    )}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                pattern: "[0-9]*",
                maxLength: 6,
                onInput: handleInputDestinationPincodeChange,
              }}
            />
            <Typography className="font1">Enter 6 digit pincode</Typography>
          </>
        )}

        {openPickupEditBox && (
          <EditDeliveryDetails
            pickupAddress={pickupAddress}
            openPickupEditBox={openPickupEditBox}
            setOpenPickupEditBox={setOpenPickupEditBox}
            setEditSave={setEditSave}
          />
        )}
        {openDestinationEditBox && (
          <EditDeliveryDetails
            destinationAddress={destinationAddress}
            openDestinationEditBox={openDestinationEditBox}
            setOpenDestinationEditBox={setOpenDestinationEditBox}
            setEditSave={setEditSave}
          />
        )}
        {!showDestinationDetailedAddress && (
          <>
            <TransitionGroup>
              {confirm && (
                <Collapse in={confirm} timeout={800}>
                  <TextField
                    label="Delivery Address"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={"4"}
                    name="deliveredAddress"
                    onChange={destinationHandleChange}
                    disabled={!confirm}
                    className="inputField_style"
                    onFocus={() => setOpenDownDestination(true)}
                    error={destinationFieldValidation?.deliveredAddress}
                    sx={{
                      "& label": {
                        color: "rgba(0, 0, 0, 0.6)",
                        "&::after": {
                          content: '"*"',
                          color: "red",
                          fontSize: "20px",
                        },
                      },
                      "& label.Mui-focused": {
                        color: "#745be7",
                        "&::after": {
                          fontSize: "28px",
                          marginRight: "10px",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(108,108,108)" },
                        "&:hover fieldset": {
                          borderColor: confirm && "#745be7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: confirm && "#745be7",
                        },
                      },
                    }}
                  />
                </Collapse>
              )}
            </TransitionGroup>

            <TransitionGroup>
              {opendownDestination && (
                <Collapse in={opendownDestination} timeout={800}>
                  <TextField
                    label="Consignee Business Name"
                    variant="outlined"
                    size="small"
                    className="inputField_style"
                    name="consignee_business_name"
                    onChange={destinationHandleChange}
                    error={destinationFieldValidation?.consignee_business_name}
                    sx={textFieldStyles}
                  />
                  <div className="grid-style">
                    {fields?.map((field, index) => (
                      <TextField
                        label={field.label}
                        variant="outlined"
                        size="small"
                        name={field?.name}
                        className="inputField_style"
                        onChange={destinationHandleChange}
                        sx={textFieldStyles}
                        error={destinationFieldValidation[field?.name]}
                      />
                    ))}
                  </div>
                </Collapse>
              )}
            </TransitionGroup>
            <TransitionGroup>
              {opendownDestination && (
                <Collapse in={opendownDestination} timeout={800}>
                  <div className="addDiv_Style">
                    <div
                      className="Add_Submit_button_style"
                      onClick={handleDestinationPickup}
                    >
                      Add & Submit
                    </div>
                  </div>
                </Collapse>
              )}
            </TransitionGroup>
          </>
        )}
      </Grid>
    );
  };
  return (
    <Card className="card-style">
      {" "}
      {props?.isMobile && (
        <div className="top-stepper-style">{props?.steps}/3</div>
      )}
      {props?.isMobile ? (
        <div>
          {mobileLocalStorageValue ? (
            <>
              <div className="Heading-style">Pickup and Delivery Address</div>
              <Grid container spacing={{ lg: 8, md: 4, xs: 2 }}>
                <Grid
                  item
                  className="pickup-address-style flex-style-column"
                  xs={12}
                  md={6}
                  lg={6}
                >
                  {detailedPickupAddressBox()}
                </Grid>
                <Grid
                  item
                  className="pickup-address-style flex-style-column"
                  xs={12}
                  md={6}
                  lg={6}
                >
                  {detailedDestinationAddressBox()}
                </Grid>
              </Grid>
              <div className="click-page">
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
            </>
          ) : (
            <>
              {mobilePickupBox ? (
                <>
                  <div className="Heading-style">Pickup Address</div>

                  {pickupAddressbox()}
                </>
              ) : (
                <>
                  {" "}
                  <div className="Heading-style">Delivery Address</div>
                  {destinationAddressBox()}
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="Heading-style">Pickup and Delivery Address</div>
          <Grid container spacing={{ lg: 8, md: 4, xs: 2 }}>
            {showPickupDetailedAddress ? (
              <Grid
                item
                className="pickup-address-style flex-style-column"
                xs={12}
                md={6}
                lg={6}
              >
                <Collapse in={showPickupDetailedAddress} timeout={800}>
                  {detailedPickupAddressBox()}
                </Collapse>
              </Grid>
            ) : (
              <>{pickupAddressbox()}</>
            )}
            {showDestinationDetailedAddress ? (
              <Grid
                item
                className="pickup-address-style flex-style-column"
                xs={12}
                md={6}
                lg={6}
              >
                <Collapse in={showDestinationDetailedAddress} timeout={800}>
                  {detailedDestinationAddressBox()}
                </Collapse>
              </Grid>
            ) : (
              <>{destinationAddressBox()}</>
            )}
          </Grid>
        </>
      )}
    </Card>
  );
};

export default DeliveryDetails;
