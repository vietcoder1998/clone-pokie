import {
    CalendarMonthOutlined,
    MessageRounded,
    Visibility,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { CommonColor } from "../../config/const";

export default function StatisticView(props) {
  return (
    <Box
      sx={{
        display: "flex",
        color: CommonColor.iconColor,
        width: "100%",
      }}
    >
      <Box
        sx={{ p: 1, gap: 1, justifyContent: "center", alignItems: "center" }}
        className={"flex center"}
        display={"flex"}
      >
        <Visibility fontSize={"small"} sx={{ fontSize: 14 }} />
        <Typography component="span" sx={{ fontSize: 14 }}>
          {props?.view}
        </Typography>
      </Box>
      <Box
        sx={{ p: 1, gap: 1, justifyContent: "center", alignItems: "center" }}
        className={"flex center"}
        display={"flex"}
      >
        <MessageRounded fontSize={"small"} sx={{ fontSize: 14 }} />
        <Typography component="span" sx={{ fontSize: 14 }}>
          {props?.totalComment ?? 0}
        </Typography>
      </Box>
      <Box
        sx={{ p: 1, gap: 1, justifyContent: "center", alignItems: "center" }}
        className={"flex center"}
        display={"flex"}
      >
        <CalendarMonthOutlined fontSize={"small"} sx={{ fontSize: 14 }} />
        <Typography component="span" sx={{ fontSize: 14 }}>
          {moment(props?.createdAt).format("DD-MM-YYYY")}
        </Typography>
      </Box>
    </Box>
  );
}
