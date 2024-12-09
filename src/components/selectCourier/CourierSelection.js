import React, { useEffect, useState } from "react";
import RbTable from "../tableComponent/RbTable";
import { Box, Card } from "@mui/material";
import VerifyFunctionality from "../VerifyContactDetails/VerifyFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { createOrderId, createRazorPayOrder } from "../../Features/paymentApi";
import CircularProgress from "@mui/material/CircularProgress";
import Assets from "../../assets/Assets";
import { showSnackbar } from "../SnackbarComponent";
import { orderShipmentAssociationApi } from "../../Features/shipmentOrderApi";
import moment from "moment";

const CourierSelection = (props) => {
  const dispatch = useDispatch();

  const pickupAddress = JSON.parse(localStorage.getItem("pickupAddress")) || {};
  const fromAddress = JSON.parse(localStorage.getItem("fromAddress")) || {};
  const toAddress = JSON.parse(localStorage.getItem("toAddress")) || {};
  const valueAdded = JSON.parse(localStorage.getItem("valueAddedData")) || {};

  const destinationAddress =
    JSON.parse(localStorage.getItem("destinationAddress")) || {};

  const framelessData = useSelector(
    (state) => state.shipmentApi.userFramelessData
  );
  const createOrderData = useSelector(
    (state) => state?.shipmentOrderApi?.createOrderData
  );
  const orderShipmentAssociation = useSelector(
    (state) => state?.shipmentOrderApi?.orderShipmentAssociation
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const clientDetails = JSON.parse(localStorage.getItem("clientData")) || {};
  const rateChargeData =
    useSelector((state) => state?.shipmentApi?.chargesData) || {};
  const [openVerifyContact, setOpenVerifyContact] = useState(false);
  const [isRecharge, setIsRecharge] = useState(false);

  const handleOpenVerify = async () => {
    if (selectedRowData && Object.keys(selectedRowData).length > 0) {
      if (framelessData?.kyc_status) {
        createOrder();
      } else {
        setOpenVerifyContact(true);
      }
    } else {
      showSnackbar({
        message: "Select any courier partner",
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
    }
  };

  useEffect(() => {
    if (isRecharge) createShipmentAssociationApi();
  }, [isRecharge]);

  const createOrder = async () => {
    let reqObj = {
      amount: Math.round(selectedRowData?.rates),
      currency: "INR",
      receipt: "",
      invoice_id: "",
      payment_capture: "1",
      is_frameless: true,
    };
    setIsLoading(true);
    try {
      const createOrder = await dispatch(createOrderId(reqObj)).unwrap();
      setIsLoading(false);
      openPayModal(createOrder);
    } catch (error) {
      setIsRecharge(false)
      showSnackbar({
        message: error,
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
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
        showSnackbar({
          message: "Payment Successful",
          severity: "success",
          duration: 3000,
          position: { vertical: "top", horizontal: "right" },
        });
        props?.setNext((current) => current + 1);
      } catch (error) {
        setIsRecharge(false)
        showSnackbar({
          message: "Payment Failed",
          severity: "error",
          duration: 3000,
          position: { vertical: "top", horizontal: "right" },
        });
        props?.setNext(2);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const openPayModal = async (createOrder) => {
    setIsLoading(true);
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

  const handleBack = () => {
    props.setNext((current) => current - 1);
  };

  const createShipmentAssociationApi = async () => {
    
    let reqObj = {
      is_frameless: true,
      client_id: framelessData?.client_id,
      order_id: orderShipmentAssociation?.id,
      delivery_partner_id: parseInt(selectedRowData?.id),
      mode_id: selectedRowData?.mode_id,
      remarks: "remarks",
      pickup_date_time: moment(createOrderData?.pickup_date_time).format(),
      recipient_GST: "",
      eway_bill_no: "",
      to_pay_amount: "0",
    };

    try {
      await dispatch(orderShipmentAssociationApi(reqObj)).unwrap();
      createOrder();
    } catch {
      setIsRecharge(false)
      showSnackbar({
        message: "Something went wrong. Please try again!",
        severity: "error",
        duration: 3000,
        position: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <div className="courierSelectionDesign">
      {isLoading ? (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Card className="card-style noPaperStyle width-fit-card">
            <div>
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "10px" }}
              >
                <div>
                  <span>
                    <span className="font-bold">From :- </span>
                    {fromAddress?.city} , {fromAddress?.state}
                  </span>
                </div>
                <div>
                  <img src="" alt="" />
                </div>
                <div>
                  <span>
                    <span className="font-bold">To:- </span>
                    {toAddress?.city} , {toAddress?.state}
                  </span>
                </div>
              </div>

              {/* <div style={{ marginBottom: "5px" }}>
                Door Pickup and Door Delivery
              </div> */}
              <div style={{ marginBottom: "5px" }}>
                <span className="font-bold">Chargeable Weight:- </span>{" "}
                {selectedRowData?.working?.chargeable_weight
                  ? selectedRowData?.working?.chargeable_weight
                  : "XX"}{" "}
                KGS
              </div>
            </div>
            {valueAdded?.is_insured && (
              <div style={{ marginBottom: "5px" }}>
                Insured for Damage and Lost
              </div>
            )}
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
                  *Frieght is dependent on calculated charge weight and
                  additional charges might incur in case of discrepency
                </div>
                <div style={{ maxWidth: "1000px", fontSize: "12px" }}>
                  You have selected{" "}
                  {selectedRowData?.common_name
                    ? selectedRowData?.common_name
                    : "(Courier Name)"}
                  , order confirmed before 12PM will get scheduled for pickup on
                  same day. Use Transporter ID{" "}
                  {selectedRowData?.transporter_id
                    ? selectedRowData?.transporter_id
                    : "XXXXXXXXX"}{" "}
                  to generate Ewaybill
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
              isRecharge={isRecharge}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CourierSelection;
