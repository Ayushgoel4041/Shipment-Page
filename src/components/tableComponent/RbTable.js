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

const RbTable = (props) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const handleRowClick = (index) => {
    setSelectedRowIndex(selectedRowIndex === index ? -1 : index);
  };

  console.log(props.tableData, "this is th data");
  return (
    <Grid container>
      <Grid item xs={12}>
        <Table
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 15px",
            width: "100%",
            fontSize: "16px",
          }}
        >
          <TableHead>
            <TableRow className="tableheadStyleNew">
              <TableCell className="textAlignCenter tableHeadCenterStyle">
                Select
              </TableCell>
              <TableCell className="textAlignCenter tableHeadCenterStyle">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.tableData.map((row, index) => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor: "#ffffff",
                }}
                className={`tableBodyStyle ${
                  selectedRowIndex === index && "selected-style-table"
                }`}
                onClick={() => handleRowClick(index)}
              >
                <TableCell className="tableBodyCellStyle textAlignCenter">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedRowIndex === index}
                        onChange={() => handleRowClick(index)}
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
                  {row.logisticPartner}
                </TableCell>
                <TableCell className="tableBodyCellStyle textAlignCenter">
                  {row.frieghtCost}
                </TableCell>
                <TableCell className="tableBodyCellStyle textAlignCenter">
                  {row.tat}
                </TableCell>
                <TableCell className="tableBodyCellStyle textAlignCenter">
                  {row.SchedulePick}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

export default RbTable;
