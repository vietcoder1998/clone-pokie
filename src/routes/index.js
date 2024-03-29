import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import i18n from "../i18n";
import React from "react";
import { Box, Container, Link } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

export const breakOptions = [
  { icon: "home", link: "/", name: "", content: "common.ui.home" },
  {
    icon: "career",
    link: "/",
    name: "career",
    content: "common.ui.career",
  },
  { icon: "edit", link: "/add", name: "edit", content: "common.ui.edit" },
  { icon: "add", link: "/edit", name: "add", content: "common.ui.add" },
  { icon: "admin", link: "/admin", name: "admin", content: "common.ui.admin" },
];

export function getIcon(icon) {
  switch (icon) {
    case "home":
      return <HomeIcon fontSize={"1.2rem"} />;
    case "career":
      return <WorkIcon fontSize={"1.2rem"} />;
    case "edit":
      return <EditIcon fontSize={"1.2rem"} />;
    case "add":
      return <AddIcon fontSize={"1.2rem"} />;
    case "admin":
      return <AddIcon fontSize={"1.2rem"} />;
    default:
      return "";
  }
}

export function BreakCrumb() {
  const { t } = i18n;
  const DisplayList = React.useMemo(() => {
    const breakCrumbList =
      window.location.pathname === "/"
        ? [""]
        : window.location.pathname
            .split("/")
            .filter((item) => !item.includes("-"));

    return breakCrumbList.map((crumb, index) => {
      const { icon, link, name, content } = breakOptions.find(
        (option) => option.name === crumb
      ) ?? { icon: "", path: "", name: "", content: breakCrumbList?.at("-1") };

      return (
        <Link key={name} href={link} sx={{ textDecoration: "none" }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginRight={1}
          >
            {getIcon(icon)} <b>{t(content)}</b>
            {index !== breakCrumbList.length - 1 && <ArrowRight />}
          </Box>
        </Link>
      );
    });
  }, [window.location.pathname]);
  return (
    <Container
      sx={{
        fontSize: "0.9rem",
        display: "flex",
        mt: 2,
        p: 0,
        backgroundColor: "whitesmoke",
      }}
    >
      {DisplayList}
    </Container>
  );
}
