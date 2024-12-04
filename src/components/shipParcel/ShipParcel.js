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
          <img src={Assets.tickMarkGif} alt="success" />
        </div>
        <div className="ship-parcel-font">Your first shipment has been successfully created!</div>
      </div>
    </Card>
  );
};

export default ShipParcel;
