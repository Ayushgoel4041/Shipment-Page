import {
  ClosedCaption,
  CloseOutlined,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Alert,
  Card,
  Dialog,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import React from "react";

const Recharge = () => {
  return (
    <Dialog open={true}>
      <div>
        <div className="creditRateHeader">recharge balance</div>
      </div>
      <Card>
        <Typography className="textInput">
          <Typography style={{ fontSize: "20px" }}>₹</Typography>
          <InputBase
            placeholder="enter amount"
            variant="outlined"
            className="enterAmount"
          />
          <Typography>
            <CloseOutlined
              style={{
                color: "grey",
                fontSize: "15px",
                cursor: "pointer",
              }}
              className="iconHandle"
            />
          </Typography>
        </Typography>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "400",
            margin: "4px 0px",
          }}
        >
          select below
        </p>
        <Typography
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexShrink: "2",
            flexWrap: "wrap",
          }}
        >
          <button className="buttonStyle" value="500">
            500
          </button>

          <button className="buttonStyle" value="1000">
            1000r
          </button>

          <button className="buttonStyle" value="2500">
            2500
          </button>

          <button className="buttonStyle" value="5000">
            5000
          </button>

          <button className="buttonStyle" value="10000">
            100000
          </button>
        </Typography>
      </Card>
      <Card>
        <Typography
          style={{
            fontSize: "12px",
            fontWeight: "400",
            margin: "5px 0px",
          }}
        >
          hace coupon
        </Typography>
        <Typography className="HaveACoupon">
          <Typography className="applyInput">
            <InputBase
              placeholder="Enter Coupon Code Here"
              className="textStyle"
            />
            <Link
              type="button"
              style={{
                fontWeight: "500",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              appy
            </Link>
          </Typography>
          {true ? (
            <div className="viewAvailCouponStyle">
              viewcoupon: <ExpandMore />
            </div>
          ) : (
            <div className="viewAvailCouponStyle">
              hide cpupoin: <ExpandLess />
            </div>
          )}
        </Typography>
        {true && <p style={{ color: "red" }}>invalid coupon</p>}
      </Card>
      <Card style={{ borderRadius: "10px" }}>
        <div className="recahrgeAmountStyle">
          <Typography className="amountCalcultion">
            <Typography className="rechargeAmountStyle">
              rechaefe amount
              <p>2123123</p>
            </Typography>
            <Typography className="rechargeAmountStyle">
              cashback :<p>2123123</p>
            </Typography>
          </Typography>
          <Typography
            className="rechargeAmountStyle"
            style={{ fontWeight: "700" }}
          >
            oayable amount
            <p>2123123</p>
          </Typography>
        </div>
      </Card>
    </Dialog>
  );
};

export default Recharge;
