import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import * as React from "react";

export default function CommonMenu(props) {
  const { onLogout } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutButton = () => {
    onLogout();
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ backgroundColor: "white", zIndex: 1 }}
        arial-label="Avatar user login"
      >
        {props?.children}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} sx={{}}>
          <Link
            href={`/profile`}
            style={{
              textDecoration: "none",
              alignItems: "center",
              display: "flex",
              justifyContent: "left",
            }}
          >
            <AccountCircleIcon />
            <b>Profile</b>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={onLogoutButton}
          sx={{
            color: "red",
          }}
        >
          <LogoutIcon />
          <b>Logout</b>
        </MenuItem>
      </Menu>
    </div>
  );
}
