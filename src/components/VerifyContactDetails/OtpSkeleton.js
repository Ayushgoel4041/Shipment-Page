import { Skeleton, Stack } from "@mui/material";
import React from "react";

const OtpSkeleton = () => {
  return (
    <Stack style={{ marginTop: "20px" }}>
      <div className="centeralign-otp-field">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={185} />
      </div>

      <div className="centeralign-otp-field">
        <Skeleton
          variant="rectangular"
          width={45}
          height={45}
          style={{ borderRadius: "8px", margin: "10px 10px 0px 0px" }}
        />
        <Skeleton
          variant="rectangular"
          width={45}
          height={45}
          style={{ borderRadius: "8px", margin: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          width={45}
          height={45}
          style={{ borderRadius: "8px", margin: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          width={45}
          height={45}
          style={{ borderRadius: "8px", margin: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          width={45}
          height={45}
          style={{ borderRadius: "8px", margin: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          width={45}
          height={45}
          style={{ borderRadius: "8px", margin: "10px" }}
        />
      </div>
      <div className="centeralign-otp-field">
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.5rem", textAlign: "center" }}
          width={255}
        />
      </div>
    </Stack>
  );
};

export default OtpSkeleton;
