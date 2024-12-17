import { ArrowDropDown, CheckBox } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RateChart from "./RateChart";
import { TransitionGroup } from "react-transition-group";

const RbTable = (props) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedRow, setSelectedRow] = useState();
  const [showMoreButton, setShowMoreButton] = useState(false);

  const handleRowClick = (index, row) => {
    const isSameRowSelected = selectedRowIndex === index;
    setSelectedRowIndex(isSameRowSelected ? -1 : index);
    props?.setSelectedRowData(isSameRowSelected ? null : row);
    if (props?.isMobile) {
      setShowMoreButton(isSameRowSelected ? false : true);
    }
  };
  const [open, setOpen] = useState(false);

  const handleOpenInfoButton = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };
  console.log(
    props?.selectedRowData,
    "<<<<<<<,----------",
    props?.selectedRowData?.delivery_partner
  );
  const handleShowMoreButton = () => {
    setShowMoreButton(false);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="table-overflow-design">
          <Table
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 10px",
              fontSize: "16px",
            }}
          >
            <TableHead
              style={{ backgroundColor: "#F3F3FF" }}
              className="customTableColor-style"
            >
              <TableRow className="tableheadStyleNew">
                {!props?.isMobile && (
                  <TableCell className="textAlignCenter tableHeadCenterStyle">
                    Select
                  </TableCell>
                )}

                <TableCell
                  className="textAlignCenter tableHeadCenterStyle"
                  colSpan={2}
                >
                  Logistic Partner
                </TableCell>
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  Frieght Cost
                </TableCell>
                {!props?.isMobile && (
                  <TableCell className="textAlignCenter tableHeadCenterStyle">
                    TAT
                  </TableCell>
                )}
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  Schedule Pick-up
                </TableCell>
                {!props?.isMobile && (
                  <TableCell className="textAlignCenter tableHeadCenterStyle">
                    Transporter ID
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {showMoreButton ? (
                <TableRow
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                  className="selected-style-table"
                >
                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    <div className="image-space-style">
                      <img
                        src={props?.selectedRowData?.logo}
                        className="logo-charge-style"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    {props?.selectedRowData?.delivery_partner}
                  </TableCell>
                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      ₹{props?.selectedRowData?.working?.freight}{" "}
                      <span
                        onClick={() =>
                          handleOpenInfoButton(props?.selectedRowData)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <InfoOutlinedIcon />
                      </span>
                    </span>
                  </TableCell>

                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    {props?.selectedRowData?.pickup_date}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {Object.values(props?.tableData)?.map((row, index) => (
                    <TableRow
                      key={row?.id}
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                      className={
                        props?.isMobile
                          ? `tableBodyStyle-mobile ${
                              selectedRowIndex === index &&
                              "selected-style-table"
                            }`
                          : `tableBodyStyle ${
                              selectedRowIndex === index &&
                              "selected-style-table"
                            }`
                      }
                      onClick={() => handleRowClick(index, row)}
                    >
                      {!props?.isMobile && (
                        <TableCell className="tableBodyCellStyle textAlignCenter">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedRowIndex === index}
                                onChange={() => handleRowClick(index, row)}
                                icon={
                                  <CheckBox
                                    sx={{
                                      border: "1px solid black",
                                      backgroundColor: "white",
                                      color: "transparent",
                                    }}
                                    fontSize="19px"
                                  />
                                }
                              />
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell className="tableBodyCellStyle textAlignCenter">
                        <div className="image-space-style">
                          <img src={row?.logo} className="logo-charge-style" />
                        </div>
                      </TableCell>
                      <TableCell className="tableBodyCellStyle textAlignCenter">
                        {row?.delivery_partner}
                      </TableCell>
                      <TableCell className="tableBodyCellStyle textAlignCenter">
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          ₹{row?.working?.freight}{" "}
                          <span
                            onClick={() => handleOpenInfoButton(row)}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <InfoOutlinedIcon />
                          </span>
                        </span>
                      </TableCell>
                      {!props?.isMobile && (
                        <TableCell className="tableBodyCellStyle textAlignCenter">
                          {row?.tat}
                        </TableCell>
                      )}
                      <TableCell className="tableBodyCellStyle textAlignCenter">
                        {row?.pickup_date}
                      </TableCell>
                      {!props?.isMobile && (
                        <TableCell className="tableBodyCellStyle textAlignCenter">
                          {row?.transporter_id}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
          {showMoreButton && (
            <div className="show-more-style" onClick={handleShowMoreButton}>
              Show More <ArrowDropDown />
            </div>
          )}
          {/* </Paper> */}
        </div>
      </Grid>
      {open && (
        <RateChart open={open} setOpen={setOpen} selectedRow={selectedRow} />
      )}
    </Grid>
  );
};

export default RbTable;
