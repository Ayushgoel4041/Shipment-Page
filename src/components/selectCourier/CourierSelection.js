import React, { useEffect, useState } from "react";
import RbTable from "../tableComponent/RbTable";
import { Card, Paper } from "@mui/material";
import VerifyFunctionality from "../VerifyContactDetails/VerifyFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { createOrderId, createRazorPayOrder } from "../../Features/paymentApi";
import Assets from "../../assets/Assets";
const CourierSelection = (props) => {
  const dispatch = useDispatch();
  const framelessData = useSelector(
    (state) => state.shipmentApi.userFramelessData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const clientDetails = JSON.parse(localStorage.getItem("clientData")) || {};
  const rateChargeData =
    useSelector((state) => state?.shipmentApi?.chargesData) || {};
  const [openVerifyContact, setOpenVerifyContact] = useState(false);
  const [isRecharge, setIsRecharge] = useState(false);

  const handleOpenVerify = async () => {
    if (framelessData?.kyc_status) {
      createOrder();
    } else {
      setOpenVerifyContact(true);
    }
  };
  useEffect(() => {
    if (isRecharge) createOrder();
  }, [isRecharge]);
  const createOrder = async () => {
    let reqObj = {
      amount: Math.round(selectedRowData?.rates),
      currency: "INR",
      receipt: "",
      invoice_id: "",
      payment_capture: "1",
    };

    try {
      const createOrder = await dispatch(createOrderId(reqObj)).unwrap();
      console.log(createOrder, "this is the create order thing");
      setIsLoading(true);
      openPayModal(createOrder);
    } catch (error) {
      console.log(error, "this is the error");
      setIsLoading(false);
    }
  };

  const getRazorpayOrder = async (reqObj) => {
    setTimeout(async () => {
      try {
        const razorPayOrder = await dispatch(
          createRazorPayOrder(reqObj)
        ).unwrap();
        console.log(razorPayOrder, "this is the status");
        props?.setNext((current) => current + 1);
      } catch (error) {
        console.log(error, "payment failed");
        props?.setNext(2);
      }
    }, 2000);
  };

  const openPayModal = async (createOrder) => {
    let client_id = clientDetails?.client_id;
    const logo = Assets.srminiLogo;
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: selectedRowData?.rates,
      order_id: createOrder.id,
      name: `${clientDetails?.first_name} ${clientDetails?.last_name}`,
      description: "Recharge Amount",
      image: logo,
      handler: async function (response) {
        // Returned by Razorpay API for successful payments.
        if (response.razorpay_payment_id) {
          // Store fields in our Server and and verifying the signature
          response.client_id = client_id;
          response.amount = selectedRowData?.rates;
          response.invoice_id = "";
          response.initiated_order_id = createOrder.id;
          // response.coupon_used = 0;
          getRazorpayOrder(response);
        }
      },
      prefill: {
        name: `${clientDetails?.first_name} ${clientDetails?.last_name}`,
        email: `${clientDetails?.email}`,
      },
      theme: {
        color: "#6F57E9",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  console.log(
    selectedRowData,
    "this is the selected row data please finfg ohdifa"
  );

  const handleBack = () => {
    props.setNext((current) => current - 1);
  };
  console.log(rateChargeData, "this is the rate charty fata");
  const pickupAddress = JSON.parse(localStorage.getItem("pickupAddress")) || {};
  const destinationAddress =
    JSON.parse(localStorage.getItem("destinationAddress")) || {};
  const packageData = JSON.parse(localStorage.getItem("PackageDetails")) || [
    {},
  ];
  const valueAddedData =
    JSON.parse(localStorage.getItem("valueAddedData")) || {};

  return (
    <div className="courierSelectionDesign">
      <Card className="card-style noPaperStyle width-fit-card">
        <div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
            <div>
              <span className="font-bold">
                From :- {pickupAddress?.city} , {pickupAddress?.state}
              </span>
              location
            </div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <span className="font-bold">
                To:- {destinationAddress?.city} , {destinationAddress?.state}
              </span>
              Location
            </div>
          </div>

          <div style={{ marginBottom: "5px" }}>
            Door Pickup and Door Delivery
          </div>
          <div style={{ marginBottom: "5px" }}>
            <span className="font-bold">Chargeable Weight:- </span>{" "}
            {selectedRowData?.working?.chargeable_weight
              ? selectedRowData?.working?.chargeable_weight
              : "XX"}{" "}
            KGS
          </div>
        </div>
        <div style={{ marginBottom: "5px" }}>Insured for Damage and Lost</div>
      </Card>

      {/* table */}
      <Card className="table-courier-style noPaperStyle">
        <RbTable
          tableData={rateChargeData}
          setSelectedRowData={setSelectedRowData}
        />
      </Card>
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
          setIsRecharge={setIsRecharge}
          {...props}
        />
      )}
    </div>
  );
};

export default CourierSelection;
