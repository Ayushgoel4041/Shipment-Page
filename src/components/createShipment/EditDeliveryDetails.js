import { CloseOutlined } from "@mui/icons-material";
import { Box, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const EditDeliveryDetails = ({
  pickupAddress,
  destinationAddress,
  setOpenPickupEditBox,
  openPickupEditBox,
  setOpenDestinationEditBox,
  openDestinationEditBox,
  setEditSave,
}) => {
  const pickupField = [
    { label: "Business Name", name: "consignor_business_name", disable: false },
    { label: "Name", name: "name", disable: false },
    { label: "Contact Number", name: "contactNumber", disable: false },
    { label: "E-mail", name: "email", disable: false },
    { label: "pickupAddress", name: "pickupAddress", disable: false },
    { label: "Source Pincode", name: "sourcePincode", disable: true },
    { label: "Landmark", name: "landmark", disable: false },
  ];
  const destinationField = [
    { label: "Business Name", name: "consignee_business_name", disable: false },
    { label: "Name", name: "name", disable: false },
    { label: "Contact Number", name: "contactNumber", disable: false },
    { label: "E-mail", name: "email", disable: false },
    {
      label: "Destination Address",
      name: "destinationAddress",
      disable: false,
    },
    { label: "Destination Pincode", name: "sourcePincode", disable: true },
    { label: "Landmark", name: "landmark", disable: false },
  ];
  const [editPickupAddress, setEditPickupAddress] = useState(
    pickupAddress || {}
  );
  const [editDestinationAddress, setEditDestinationAddress] = useState(
    destinationAddress || {}
  );

  const textFieldStyles = {
    "& label": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    "& label.Mui-focused": {
      color: "#745be7",
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (openPickupEditBox)
      setEditPickupAddress((prevData) => ({ ...prevData, [name]: value }));
    if (openDestinationEditBox)
      setEditDestinationAddress((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveFunction = () => {
    if (openPickupEditBox) {
      localStorage.setItem("pickupAddress", JSON.stringify(editPickupAddress));
      setOpenPickupEditBox(!openPickupEditBox);
    }
    if (openDestinationEditBox) {
      localStorage.setItem(
        "destinationAddress",
        JSON.stringify(editDestinationAddress)
      );
      setOpenDestinationEditBox(!openDestinationEditBox);
    }

    setEditSave(true);
  };
  console.log(editPickupAddress, "this is");
  const handleClose = () => {
    if (openPickupEditBox) {
      setOpenPickupEditBox(!openPickupEditBox);
    }
    if (openDestinationEditBox) {
      setOpenDestinationEditBox(!openDestinationEditBox);
    }
  };

  return (
    <Dialog
      open={openPickupEditBox || openDestinationEditBox}
      scroll="paper"
      maxWidth="md"
      fullWidth
      onClose={() => handleClose()}
    >
      <Box className="editBoxStyle">
        <div className="editBoxStyle-head">
          <div className="font-edit-style">Edit Address</div>
          <div>
            <CloseOutlined onClick={() => handleClose()} style={{cursor:'pointer'}}/>
          </div>
        </div>
        <div className="editbox-body">
          {openPickupEditBox && (
            <div>
              {pickupField?.map((field, index) => (

                <div className="textfield-style">
                  <TextField
                    label={field?.label}
                    variant="outlined"
                    size="small"
                    disabled={field?.disable}
                    onChange={handleInputChange}
                    name={field?.name}
                    placeholder={
                      field?.disable && editPickupAddress[field?.name]
                    }
                    value={!field?.disable && editPickupAddress[field?.name]}
                    fullWidth
                    sx={textFieldStyles}
                  />
                </div>
              ))}
            </div>
          )}
          {openDestinationEditBox && (
            <div>
              {destinationField?.map((field, index) => (
                <div className="textfield-style">
                  <TextField
                    label={field?.label}
                    variant="outlined"
                    size="small"
                    disabled={field?.disable}
                    onChange={handleInputChange}
                    name={field?.name}
                    placeholder={
                      field?.disable && editDestinationAddress[field?.name]
                    }
                    value={
                      !field?.disable && editDestinationAddress[field?.name]
                    }
                    fullWidth
                    sx={textFieldStyles}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="edit-box-action-button-style">
            <div onClick={() => handleClose()} className="back-style">Cancel</div>
            <div onClick={() => handleSaveFunction()} className="confirm-style">Save</div>
          </div>
        </div>
      </Box>
    </Dialog>
  );
};

export default EditDeliveryDetails;
