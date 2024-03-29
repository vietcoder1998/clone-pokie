import { Box, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

export default function BlogLink({
  href,
  children = "",
  size = "default",
  sx = {},
  linkStyle = {},
  typoSx = {},
  title = "",
}) {
  const fontSize = () => {
    switch (size) {
      case "large":
        return "1.2rem";
      case "small":
        return "0.9rem";
      case "default":
      case "normal":
      default:
        return "1rem";
    }
  };

  const component = () => {
    switch (size) {
      case "large":
        return "h1";
      case "small":
        return "p";
      case "default":
      case "normal":
      default:
        return "p";
    }
  };
  return (
    <Box
      component={"div"}
      className="mt-2"
      sx={{
        display: "flex",
        top: 0,
        ...sx,
      }}
    >
      <Typography
        component={component()}
        sx={{
          fontStyle: "bold",
          fontSize: fontSize(),
          backgroundColor: "#ffffff00",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
          ...typoSx,
        }}
      >
        <Tooltip title={title}>
          <Link
            href={href}
            style={{
              cursor: "pointer",
              textTransform: "capitalize",
              textDecoration: "none",
              color: "black",
              ...(linkStyle ?? {}),
            }}
          >
            {children}
          </Link>
        </Tooltip>
      </Typography>
    </Box>
  );
}
