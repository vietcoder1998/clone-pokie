import { Search } from "@mui/icons-material";
import { Box, Input } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export default function MenuBarList({
  classes,
  onSearch,
  filterData,
  navigateWithSearchBar,
}) {
  return (
    <Box>
      <List sx={{}}>
        <ListItem>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <Input placeholder="Search content..." onChange={onSearch} />
        </ListItem>
      </List>
      <Box className={classes.list} role="presentation">
        <List sx={{}}>
          {/* Add your sidebar items here */}
          {filterData &&
            filterData?.map((item, index) => (
              <>
                <ListItem
                  key={`mobile-bar-${index}`}
                  id={item.key}
                  sx={{ borderRadius: 2 }}
                  onClick={() => navigateWithSearchBar(item?.link)}
                >
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText
                    sx={{ fontWeight: 600 }}
                    primary={<b>{item?.content}</b>}
                  />
                </ListItem>
                {item?.options?.length ? (
                  <List sx={{ px: 2 }}>
                    {item?.options?.map((option, optionIndex) => (
                      <ListItem
                        key={`option-${option?.content}-${optionIndex}`}
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigateWithSearchBar(option?.link)}
                      >
                        <ListItemIcon>{option?.icon}</ListItemIcon>
                        <ListItemText
                          sx={{ fontWeight: 600 }}
                          primary={<b>{option?.content}</b>}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  ""
                )}
              </>
            ))}
        </List>
      </Box>
    </Box>
  );
}
