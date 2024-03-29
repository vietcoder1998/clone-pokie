import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import i18n from "../../../../../i18n";

export default function IconMenu() {
  const { t } = i18n;
  return (
    <nav aria-label="main mailbox folders">
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon/>
            </ListItemIcon>
            <ListItemText primary={t('pages.profile.general')} />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}
