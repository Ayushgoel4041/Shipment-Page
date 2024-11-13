import React from "react";

const VerifyGst = () => {
  return (
    <>
      <DialogTitle>
        <div>Verify GST TIN</div>
        <div>
          <CloseIcon onClick={handleClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <div>
              GSTIN <Input inputProps={ariaLabel} />{" "}
              <span onClick={handleKycOtpVerify}> verfiy</span>
            </div>
            {kycOtpVerify && (
              <div>
                OTP <Input inputProps={ariaLabel} />
              </div>
            )}
          </div>
          <div>Manually Upload Documents</div>
          <div>Proceed to confirm booking</div>
          <div>
            Enter details to proceed for payment of shipment from South Delhi to
            Bangalore to be shipped via (Delhivery) at (INR XXX)
          </div>{" "}
        </div>
      </DialogContent>
    </>
  );
};

export default VerifyGst;
