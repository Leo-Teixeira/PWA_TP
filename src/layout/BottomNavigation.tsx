import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import GroupIcon from "@mui/icons-material/Group";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LanguageIcon from "@mui/icons-material/Language";
import "../core/layout/BottomNavigation.scss";
import { Link } from "react-router-dom";
import { PageNamesConstants } from "../core/constant/page-name-constant";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className="BottomNavigation">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}>
        <BottomNavigationAction
          label="TP 1"
          value="tp_1"
          icon={<PhotoCameraIcon />}
          component={Link}
          to={PageNamesConstants.Tp1.path}
        />
        <BottomNavigationAction
          label="TP 2"
          value="tp_2"
          icon={<LanguageIcon />}
          component={Link}
          to={PageNamesConstants.Tp2.path}
        />
        <BottomNavigationAction
          label="TP 3"
          value="tp_3"
          icon={<GroupIcon />}
          component={Link}
          to={PageNamesConstants.Tp3.path}
        />
      </BottomNavigation>
    </Box>
  );
}
