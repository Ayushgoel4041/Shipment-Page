import React from "react";

const CustomSwitch = ({ isCm, setIsCm }) => {
  const toggleSwitch = () => {
    setIsCm(!isCm); // Update the parent state
  };

  return (
    <div
      onClick={toggleSwitch}
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "45px",
        height: "15px",
        borderRadius: "20px",
        backgroundColor: isCm ? "#fff" : "#2d2d67",
        padding: "5px",
        cursor: "pointer",
        border: isCm ? "1px solid #2d2d67" : "",
        transition: "background-color 0.3s",
      }}
    >
      {/* Label for CM */}
      {!isCm && (
        <span
          style={{
            position: "absolute",
            left: "10px",
            color: "#fff",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          cm
        </span>
      )}

      {/* Label for INCH */}
      {isCm && (
        <span
          style={{
            position: "absolute",
            right: "10px",
            color: "#2d2d67",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          inch
        </span>
      )}

      {/* Toggle Circle */}
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: isCm ? "#2d2d67" : "#fff",
          position: "absolute",
          top: "2px",
          left: isCm ? "5px" : "30px",
          transition: "left 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export default CustomSwitch;
