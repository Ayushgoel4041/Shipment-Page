import React from "react";
import { FormControlLabel, styled } from "@mui/material";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 35,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1.5,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#2d2d67",
        opacity: 1,
        border: 0,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#2d2d67",
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 17,
    height: 17,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  margin: 0,
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#745be7",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "#745be7",
    }),
  },
}));
const SwitchComponent = ({
  type,
  checked,
  onChange,
  label,
  fontSize,
  disable,
}) => {
  return (
    <FormControlLabel
      control={
        type === "AntSwitch" ? (
          <AntSwitch
            checked={checked}
          
            onChange={(e) => onChange(e.target.checked)} // Notify parent about the state change
            disabled={disable}
            sx={{ m: 0 }}
            defaultChecked
          />
        ) : (
          <IOSSwitch
            sx={{ m: 0 }}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)} // Notify parent about the state change
            disabled={!disable}
          />
        )
      }
      label={label}
      sx={{
        ...(type === "AntSwitch" && { margin: 0 }),
        "& .MuiFormControlLabel-label": {
          fontSize: fontSize || "14px",
        },
      }}
    />
  );
};

export default SwitchComponent;
