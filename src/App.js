import React, { useEffect, useState } from "react";
import "./App.css";
import CreateShipment from "./components/createShipment";
import CourierSelection from "./components/selectCourier/CourierSelection";
import Navbar from "./components/Navbar/Navbar";
import CurrentWidth from "./CurrentWidth/UseCurrentWidth";
import Steps from "./components/stepsCount/Steps";
import Recharge from "./components/MakePayment.js/Recharge";

const App = () => {
  const width = CurrentWidth();

  const [next, setNext] = useState(1);
  const [openFullSideBar, setOpenFullSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  const toggleSidebar = () => {
    setOpenFullSideBar((prev) => !prev);
  };

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
        <Steps  setNext={setNext} next={next}/>
        {next === 1 && <CreateShipment setNext={setNext} next={next} />}
        {next === 2 && <CourierSelection setNext={setNext} />}
        {next === 3 && <Recharge/>}
      </div>
    </div>
  );
};

export default App;
