import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Assets from "../../assets/Assets";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Store from "@mui/icons-material/Store";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Description from "@mui/icons-material/Description";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CurrentWidth from "../../CurrentWidth/UseCurrentWidth";

const Navbar = ({ openFullSideBar, toggleSidebar, setOpenFullSideBar }) => {
  const width = CurrentWidth();

  const route = [
    {
      key: 1,
      path: "/Dashboard",
      name: "Dashboard",
      icon: DashboardIcon,
      // component: Welcome,
      // layout: '/client',
      // permission: 'dashboard',
    },
    {
      key: 2,
      path: "/Shipments",
      name: "Shipments",
      icon: LocalShippingIcon,
    },
    {
      key: 3,
      path: "/Warehouse",
      name: "Warehouse",
      icon: Store,
    },
    {
      key: 4,
      path: "/Weight-discrepancies",
      name: "Weight Discrepancies",
      icon: LineWeightIcon,
    },
    {
      key: 5,
      path: "/NDR",
      name: "NDR",
      icon: AssessmentIcon,
    },
    {
      key: 6,
      path: "/Help_n_support",
      name: "Help And Support",
      icon: Description,
    },
  ];
  const [onHoverOpen, setOnHoverOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  return (
    <div>
      <AppBar position="fixed" className="navbar-content">
        <Toolbar
          className="navbar-tollbar-style"
          style={{
            transition: "margin-left 0.6s ease",
            marginLeft: isMobile ? "0px" : openFullSideBar ? "240px" : "70px",
          }}
        >
          <Box onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
            {openFullSideBar ? (
              <ArrowBackIosIcon />
            ) : (
              <FormatListBulletedIcon />
            )}
          </Box>

          <Typography variant="h6" noWrap component="div">
            {/* navbar */}
          </Typography>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Drawer
          open={openFullSideBar}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#06064d",
              color: "#fff",
            },
          }}
          onClose={() => setOpenFullSideBar(false)}
        >
          <div className="drawer-toolbar-style">
            <Box className="drawer-header-logo-style">
              <img
                src={Assets.srLogo}
                alt="cargo logo"
                className="full-image-size-style"
              />
            </Box>

            {route?.map((dashData, index) => (
              <Box
                key={dashData.key}
                className="route-box-style"
                onClick={() => setOpenFullSideBar(false)}
              >
                <div>{React.createElement(dashData.icon)}</div>
                <div className="route-name-style">{dashData.name}</div>
              </Box>
            ))}
          </div>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#06064d",
              color: "#fff",
            },
          }}
          onMouseEnter={() => setOnHoverOpen(true)}
          onMouseLeave={() => setOnHoverOpen(false)}
        >
          <div className="drawer-toolbar-style">
            {onHoverOpen || openFullSideBar ? (
              <Box className="drawer-header-logo-style">
                <img
                  src={Assets.srLogo}
                  alt="cargo logo"
                  className="full-image-size-style"
                />
              </Box>
            ) : (
              <Box className=" drawer-header-mini-logo-style">
                <img
                  src={Assets.srminiLogo}
                  alt="mini logo"
                  className="mini-image-size-style"
                />
              </Box>
            )}

            {onHoverOpen || openFullSideBar ? (
              <>
                {route?.map((dashData, index) => (
                  <Box key={dashData.key} className="route-box-style show">
                    <div>{React.createElement(dashData.icon)}</div>
                    <div className="route-name-style">{dashData.name}</div>
                  </Box>
                ))}
              </>
            ) : (
              <>
                {route?.map((dashData, index) => (
                  <Box key={dashData.key} className="route-box-style hide">
                    <div>{React.createElement(dashData.icon)}</div>
                  </Box>
                ))}
              </>
            )}
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Navbar;
