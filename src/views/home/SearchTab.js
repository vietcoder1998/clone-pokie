import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CommonColor } from "../../config/const";
import { useRouter } from "next/router";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        textTransform: "uppercase",
        marginTop: 2,
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function TabDisplay(props) {
  const { value } = props;

  return (
    <CustomTabPanel value={value} index={0}>
      {props?.children}
    </CustomTabPanel>
  );
}

function TabLabelItem({ handleChangeTab, label, index, value }) {
  const onChangeTab = (index) => {
    if (handleChangeTab) {
      handleChangeTab(index);
      window.scroll({ top: 0 });
    }
  };

  return (
    <Grid
      item
      md={1.5}
      sx={{
        fontSize: "1rem",
        ...(index === value
          ? {
              color: CommonColor.linkColor,
              fontWeight: "bold",
              border: `solid ${CommonColor.linkColor} 1px`,
            }
          : { border: "solid white 1px" }),
        borderRadius: 5,
        px: 2,
        py: 1,
        mt: 1,
        mr: 1,
        fontSize: '0.8rem',
        textTransform: "capitalize",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          backgroundColor: "whitesmoke",
        },
      }}
      onClick={() => onChangeTab(index)}
    >
      {label}
    </Grid>
  );
}

export default function SearchTab(props) {
  const [value, setValue] = React.useState();
  const { tags } = props ?? { tags: [] };
  const navigate = useRouter();

  const handleChangeTab = (index) => {
    setValue(index);
    
    const tag = tags?.at(index);
    const defaultTagName = tag?.name;

    navigate.push(`/?tag=${defaultTagName}`);
    props.onChangeTab(index);
  };

  React.useEffect(() => {
    // first load tag on go to page
    const searchParams = new URLSearchParams(window.location.search);
    const defaultTagName = searchParams.get("tag");
    const defaultIndex = tags?.findIndex(
      (item) => item.name === defaultTagName
    );

    if (defaultIndex && tags?.length > 0) {
      setValue(defaultIndex);
      props.onChangeTab(defaultIndex);

      navigate.push(`/?tag=${defaultTagName}`);
    }
  }, [tags]);

  return (
    <Grid sx={{ borderColor: "divider", mb: 2 }} md={12} item>
      <Grid
        aria-label="basic tabs example"
        sx={{
          mb: 2,
          position: "sticky",
          top: 60,
        }}
        container
      >
        {(tags ?? [])?.map(({ name }, index) => (
          <TabLabelItem
            key={`table-item-${index}`}
            value={value}
            handleChangeTab={handleChangeTab}
            label={name}
            index={index}
          />
        ))}
      </Grid>
      <CustomTabPanel value={value}>
        <TabDisplay value={value} />
      </CustomTabPanel>
    </Grid>
  );
}
