import { Dialog, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import VerifyContact from "./VerifyContact";
import Assets from "../../assets/Assets";
import useCurrentWidth from "../../CurrentWidth/UseCurrentWidth";
import VerifyGst from "./VerifyGst";

const VerifyFunctionality = (props) => {
  const width = useCurrentWidth();

  const handleClose = () => {
    props?.setOpenVerifyContact(!props?.openVerifyContact);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  return (
    <div>
      {isMobile ? (
        <Drawer
          open={props?.openVerifyContact}
          anchor="right"
          // onClose={!props?.verifyContact && handleClose()}
          style={{ zIndex: "12222" }}
          PaperProps={{
            className: "drawerWidth",
          }}
        >
          <div>
            <div>
              {props?.verifyContact === true ? (
                <VerifyContact {...props} />
              ) : (
                <VerifyGst {...props} />
              )}
            </div>
            {isMobile && (
              <div className="image-login-mobile-style">
                <img src={Assets.loginImageMobile} />
              </div>
            )}
          </div>
        </Drawer>
      ) : (
        <Dialog
          open={props?.openVerifyContact}
          onClose={() => {
            !props?.verifyContact && handleClose();
            // handleClose();
          }}
          classes={{
            paper: "dialogWidth",
          }}
          scroll="paper"
        >
          {props?.verifyContact === true ? (
            <VerifyContact {...props} />
          ) : (
            <VerifyGst {...props} />
          )}
        </Dialog>
      )}
    </div>
  );
};

export default VerifyFunctionality;
