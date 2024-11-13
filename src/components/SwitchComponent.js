import React from "react";
import { FormControlLabel, styled } from "@mui/material";
import Switch from "@mui/material/Switch";

const Android12Switch = styled(Switch)(({ theme }) => ({
  width: 80, // Increase width to give more room for the labels and thumb
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #dce2f0",
    width: "75px",
    height: "28px",

    "&::before, &::after": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 12,
      fontWeight: "bold",
      color: "#000",
    },
    "&::before": {
      content: '"inch"',
      left: 10,
    },
    "&::after": {
      content: '"cm"',
      right: 10,
    },
  },
  "& .MuiSwitch-thumb": {
    width: 30,
    height: 30,
    margin: "5px 2px 0px",
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(40px)", // Adjusted translation for proper alignment
      // color: "#fff",
    },
  },
}));

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
        // Adjust for dark mode using the correct theme property
        // backgroundColor: theme.palette.mode === 'dark' ? "#2ECA45" : "#65C466",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#2d2d67",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      // Adjust for dark mode
      //   color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      // Adjust for dark mode
      //   opacity: theme.palette.mode === 'dark' ? 0.3 : 0.7,
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
    // Adjust for dark mode
    // backgroundColor: theme.palette.mode === 'dark' ? "#39393D" : "#E9E9EA",
  },
}));

const SwitchComponent = (props) => {
  return (
    <div>
      {props?.type === "IOSSwitch" && (
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label={props?.label}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize:props?.fontSize
            },
          }}
        />
      )}
      {props?.type === "Android12Switch" && (
        <FormControlLabel
          control={<Android12Switch defaultChecked size="medium" />}
          label={props?.label}
        />
      )}
    </div>
  );
};

export default SwitchComponent;
