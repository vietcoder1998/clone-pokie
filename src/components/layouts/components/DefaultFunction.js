import { Add, ArrowUpward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { CommonColor } from "../../../config/const";

export default function DefaultFunction({ userInfo }) {
  const navigate = useRouter();
  const onNavigateToCreate = () => {
    navigate.push("/career");
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 80,
        right: 20,
        zIndex: 1,
        gap: 2,
        justifyItems: "column",
      }}
    >
      {userInfo?.id ? (
        <Box sx={{ backgroundColor: "white", borderRadius: "50%", mb: 2 }}>
          <IconButton
            sx={{
              p: 2,
              color: "whitesmoke",
              backgroundColor: CommonColor.linkColor,
              fontWeight: "bold",
              "&:hover": {
                color: "black",
              },
            }}
            onClick={onNavigateToCreate}
            aria-label="navigate to add blog"
          >
            <Add />
          </IconButton>
        </Box>
      ) : null}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      >
        <IconButton
          sx={{
            p: 2,
            color: "whitesmoke",
            backgroundColor: CommonColor.linkColor,
            "&:hover": {
              color: "black",
            },
          }}
          onClick={() => window.scrollTo({ top: 0, right: 0 })}
          aria-label="navigate to top screen"
        >
          <ArrowUpward />
        </IconButton>
      </Box>
    </Box>
  );
}
