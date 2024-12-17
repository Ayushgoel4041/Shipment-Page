import { Card, Button } from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RateChart from "./RateChart";

const CardTable = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [showAllCards, setShowAllCards] = useState(true);  // New state to manage show/hide of cards

  const handleOpenInfoButton = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const handleRowClick = (index, row) => {
    const isSameRowSelected = selectedRowIndex === index;
    setSelectedRowIndex(isSameRowSelected ? -1 : index);
    props?.setSelectedRowData(isSameRowSelected ? null : row);
  };

  const handleToggleCards = () => {
    setShowAllCards(!showAllCards); // Toggle between showing all or collapsing cards
  };

  return (
    <div>
      {Object.values(props?.tableData)?.map((row, index) => (
        <Card
          className={`card-table-style noPaperStyle ${
            selectedRowIndex === index && "selected-style-table"
          }`}
          onClick={() => handleRowClick(index, row)}
          style={{ display: showAllCards || selectedRowIndex === index ? "block" : "none" }} // Conditionally render cards
        >
          <div className="card-table-left-side">
            <img src={row?.logo} className="logo-charge-style" />
          </div>
          <div
            className={` ${
              selectedRowIndex === index && "card-table-right-side"
            }`}
          >
            <div className="card-del-partner-style">
              {row?.delivery_partner}
            </div>
            <div className="card-sub-body-style">
              <div className="card-working-freight-style">
                <span className="card-content-font-style">Freight Cost: </span>₹
                {row?.working?.freight}{" "}
                <span
                  onClick={() => handleOpenInfoButton(row)}
                  style={{ cursor: "pointer" }}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 20 }} />
                </span>
              </div>
              {row?.tat && (
                <div className="card-tat-style">
                  <span className="card-content-font-style">TAT: </span>{" "}
                  {row?.tat}
                </div>
              )}
              <div className="card-pickup-date-style">
                <span className="card-content-font-style">Pickup Date</span>{" "}
                {row?.pickup_date}
              </div>
              <div className="card-tarnsporter-id-style">
                <span className="card-content-font-style">
                  Transporter ID:{" "}
                </span>
                {row?.transporter_id}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Show More/Show Less button */}
      <Button onClick={handleToggleCards} variant="contained" color="primary" style={{ marginTop: "10px" }}>
        {showAllCards ? "Show Less" : "Show More"}
      </Button>

      {open && (
        <RateChart open={open} setOpen={setOpen} selectedRow={selectedRow} />
      )}
    </div>
  );
};

export default CardTable;
