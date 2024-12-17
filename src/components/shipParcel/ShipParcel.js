import { Card } from "@mui/material";
import React, { useEffect } from "react";
import Assets from "../../assets/Assets";
const ShipParcel = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Card className="card-style ">
      <div className="ship-parcel-style">
        <div>
          <img src={Assets.tickMarkGif} alt="success" style={{width:'100%'}}/>
        </div>
        <div className="ship-parcel-font">Your first shipment has been successfully created!</div>
      </div>
        <div className="button-styles-label">
          <div className="download-label-button-style">Download Label</div>
          <div className="create-another-shipment-style">Create Another Shipment</div>
        </div>
    </Card>
  );
};

export default ShipParcel;
