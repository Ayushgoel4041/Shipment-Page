import { CheckBox } from "@mui/icons-material";
import {
  Checkbox,
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

const RbTable = (props) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedRow, setSelectedRow] = useState();

  const handleRowClick = (index, row) => {
    const isSameRowSelected = selectedRowIndex === index;
    setSelectedRowIndex(isSameRowSelected ? -1 : index);
    props?.setSelectedRowData(isSameRowSelected ? null : row);
  };
  const [open, setOpen] = useState(false);

  const handleOpenInfoButton = (row) => {
    setOpen(true);
    setSelectedRow(row)
  };
  

  return (
    <Grid container>
      <Grid item xs={12}>
        <div
          className="table-overflow-design"
         
        >
          <Table
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 15px",
              fontSize: "16px",
            }}
          >
            <TableHead
              style={{ backgroundColor: "#F3F3FF" }}
              className="customTableColor-style"
            >
              <TableRow className="tableheadStyleNew">
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  Select
                </TableCell>
                <TableCell
                  className="textAlignCenter tableHeadCenterStyle"
                  colSpan={2}
                >
                  Logistic Partner
                </TableCell>
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  Frieght Cost
                </TableCell>
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  TAT
                </TableCell>
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  Schedule Pick-up
                </TableCell>
                <TableCell className="textAlignCenter tableHeadCenterStyle">
                  Transporter ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(props?.tableData)?.map((row, index) => (
                <TableRow
                  key={row?.id}
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                  className={`tableBodyStyle ${
                    selectedRowIndex === index && "selected-style-table"
                  }`}
                  onClick={() => handleRowClick(index, row)}
                >
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
                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    {row?.tat}
                  </TableCell>
                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    {row?.pickup_date}
                  </TableCell>
                  <TableCell className="tableBodyCellStyle textAlignCenter">
                    {row?.transporter_id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
