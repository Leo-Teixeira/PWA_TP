import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
// src\core\layout\BottomNavigation.css
import "../core/layout/BottomNavigation.scss";

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState(0);

  return (
    <nav className='bottomNavigation'>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        >
        <BottomNavigationAction label="Photo / Loc" icon={<PhotoCameraIcon />} />
        <BottomNavigationAction label="Onligne" icon={<LanguageIcon />} />
        <BottomNavigationAction label="Tchat" icon={<GroupIcon />} />
      </BottomNavigation>
    </nav>
  );
}
