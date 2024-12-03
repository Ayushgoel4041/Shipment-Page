import React, { useEffect, useState } from "react";
import RbTable from "../tableComponent/RbTable";
import { Card, Paper } from "@mui/material";
import VerifyFunctionality from "../VerifyContactDetails/VerifyFunctionality";
import { useDispatch, useSelector } from "react-redux";

const CourierSelection = (props) => {
  // const rateChargeData =
  //   useSelector((state) => state.cargoUrl.chargesData) || {};
  const [openVerifyContact, setOpenVerifyContact] = useState(false);

  const handleOpenVerify = () => {
    setOpenVerifyContact(true);
  };

  const data = [
    {
      id: 1,
      logisticPartner: "Scorpion",
      frieghtCost: 1212,
      tat: 9,
      SchedulePick: "oct 3",
    },
    {
      id: 2,
      logisticPartner: "gati",
      frieghtCost: 1312,
      tat: 5,
      SchedulePick: "oct 3",
    },
    {
      id: 3,
      logisticPartner: "Delhivery",
      frieghtCost: 1312,
      tat: 5,
      SchedulePick: "oct 3",
    },
    {
      id: 4,
      logisticPartner: "V-xpress",
      frieghtCost: 1312,
      tat: 5,
      SchedulePick: "oct 3",
    },
  ];

  const handleBack = () => {
    props.setNext((current) => current - 1);
  };
  // console.log(rateChargeData, "this is the rate charty fata");

  return (
    <div className="courierSelectionDesign">
      <Card className="card-style noPaperStyle width-fit-card">
        <div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
            <div>
              <span className="font-bold">From :- </span>location{" "}
            </div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <span className="font-bold">To:- </span>Location
            </div>
          </div>

          <div style={{ marginBottom: "5px" }}>
            Door Pickup and Door Delivery
          </div>
          <div style={{ marginBottom: "5px" }}>
            <span className="font-bold">Chargeable Weight:-</span> XX KGS
          </div>
        </div>
        <div style={{ marginBottom: "5px" }}>Insured for Damage and Lost</div>
      </Card>

      {/* table */}
      <div className="table-courier-style">
        <RbTable tableData={data} />
      </div>
      <Card className="card-style noPaperStyle">
        <div className="bottom-courier-box">
          <div>
            <div style={{ fontWeight: "600", marginBottom: "10px" }}>
              *Frieght is dependent on calculated charge weight and additional
              charges might incur in case of discrepency
            </div>
            <div style={{ maxWidth: "1000px", fontSize: "12px" }}>
              You have selected (Courier Name) , order confirmed before 12PM
              will get scheduled for pickup on same day. Use Transporter ID
              (XXXXXXXXX) to generate Ewaybill
            </div>
          </div>

          <div className="button-courier-style">
            <div onClick={handleBack} className="back-style">
              Back
            </div>
            <div onClick={handleOpenVerify} className="confirm-style">
              Confirm
            </div>
          </div>
        </div>
      </Card>

      {openVerifyContact && (
        <VerifyFunctionality
          openVerifyContact={openVerifyContact}
          setOpenVerifyContact={setOpenVerifyContact}
          {...props}
        />
      )}
    </div>
  );
};

export default CourierSelection;
