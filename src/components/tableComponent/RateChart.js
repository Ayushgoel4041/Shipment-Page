import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

const RateChart = (props) => {
  console.log(props?.selectedRow,'<<<<<<<<----adcfdassfsdsdasdad------');
  
  return (
    <Dialog open={props?.open}>
      <DialogTitle>Rate Calculation</DialogTitle>
      <DialogContent>
      <Table
          sx={{
            "& td, & th": {
              padding: "6px 10px", // Reduced padding for cells
            },
            "& tr": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)", // Adds a subtle row separator
            },
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>From - Zone</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.sender_zone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>To - Zone</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.recipient_zone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sender City</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.sender_city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Recipient City</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.recipient_city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chargeable Wt.</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.chargeable_weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rate</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.rate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Freight</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.freight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Handling Charges</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.handling_charges}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ODA</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.oda}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FSC</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.fsc}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Awb Charges</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.awb_charges}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rov</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.rov}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{props?.selectedRow?.working?.total}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GST</TableCell>
              <TableCell align="right">{props?.selectedRow?.working?.gst}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Estimated Grand Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{props?.selectedRow?.working?.grand_total}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div
          style={{
            fontSize: "0.875rem",
            color: "rgba(0, 0, 0, 0.6)",
            marginTop: "1rem",
          }}
        >
          *Freight charges are inclusive of secure shipment charges, if the
          shipment is secured
        </div>
      </DialogContent>
      <DialogActions>
        <div
          className="Add_Submit_button_style"
          onClick={() => props?.setOpen(!props?.open)}
        >
          OK
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default RateChart;
