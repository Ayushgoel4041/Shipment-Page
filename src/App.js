import React, { useEffect, useState } from "react";
import "./App.css";
import CreateShipment from "./components/createShipment";
import CourierSelection from "./components/selectCourier/CourierSelection";
import Navbar from "./components/Navbar/Navbar";
import CurrentWidth from "./CurrentWidth/UseCurrentWidth";
import Steps from "./components/stepsCount/Steps";
import VerifyFunctionality from "./components/VerifyContactDetails/VerifyFunctionality";
import Cookies from "js-cookie";
import { getFramelessShipment } from "./Features/shipmentApi";
import { useDispatch, useSelector } from "react-redux";
import ShipParcel from "./components/shipParcel/ShipParcel";
const App = () => {
  const width = CurrentWidth();
  const dispatch = useDispatch();
  const [next, setNext] = useState(1);
  const [openFullSideBar, setOpenFullSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolledOrClicked, setHasScrolledOrClicked] = useState(false);
  const [openVerifyContact, setOpenVerifyContact] = useState(false);
  const [userData, setUserData] = useState();
  const [intialCall, setInitialCall] = useState(true);
  // Function to be called when user scrolls or clicks

  const handleScrollOrClick = async () => {
    if (!hasScrolledOrClicked) {
      setTimeout(() => {
        someFunction();
        setHasScrolledOrClicked(true);
      }, 2000);
      window.removeEventListener("scroll", handleScrollOrClick);
      document.removeEventListener("click", handleScrollOrClick);
    }
  };

  const clientData = JSON.parse(localStorage.getItem("clientData")) || {};

  const someFunction = () => {
    setOpenVerifyContact(true);
  };

  const getFramelessShipmentFunction = async () => {
    try {
      await dispatch(getFramelessShipment(clientData)).unwrap();
    } catch (error) {
      console.log(error, "this is error if frameless tocket");
    }
  };

  useEffect(() => {
    const token = Cookies.get("BearerToken" || "");
    if (token) {
      if (intialCall) {
        setInitialCall(false);
        getFramelessShipmentFunction();
      }
    } else {
      window.addEventListener("scroll", handleScrollOrClick);
      document.addEventListener("click", handleScrollOrClick);

      return () => {
        window.removeEventListener("scroll", handleScrollOrClick);
        document.removeEventListener("click", handleScrollOrClick);
      };
    }
  }, [hasScrolledOrClicked, intialCall]);

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  const toggleSidebar = () => {
    setOpenFullSideBar((prev) => !prev);
  };
  console.log("this is the data after validation", userData);

  return (
    <div style={{ display: "flex" }}>
      <Navbar
        openFullSideBar={openFullSideBar}
        toggleSidebar={toggleSidebar}
        setOpenFullSideBar={setOpenFullSideBar}
      />
      <div
        style={{
          flexGrow: 1,
          transition: "margin-left 0.6s ease",
          marginLeft: isMobile ? "0px" : openFullSideBar ? "230px" : "70px", // Adjust based on sidebar state
          padding: !isMobile && "16px",
          marginTop: isMobile ? "55px" : "70px",
        }}
      >
        {!isMobile && <Steps setNext={setNext} next={next} />}
        {next === 1 && <CreateShipment setNext={setNext} next={next} />}
        {next === 2 && <CourierSelection setNext={setNext} />}
        {next === 4 && <ShipParcel />}
      </div>
      {openVerifyContact && (
        <VerifyFunctionality
          setOpenVerifyContact={setOpenVerifyContact}
          openVerifyContact={openVerifyContact}
          verifyContact={true}
          setUserData={setUserData}
          userData={userData}
        />
      )}
    </div>
  );
};

export default App;
