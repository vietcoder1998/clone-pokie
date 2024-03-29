import { Box, Container } from "@mui/material";
import React from "react";
import MobileHeader from "./components/MobileHeader";
import WebHeader from "./components/WebHeader";
import styled from "@emotion/styled";

const HeaderContainer = styled("div")(() => ({
  top: 0,
  position: "sticky",
  zIndex: 2,
  fontWeight: "0.8rem",
  color: "#6c757d",
  backgroundColor: "white",
}));

export default function Header(props) {
  const [isScroll, setIsScroll] = React.useState(false);
  const scrollStyle = isScroll
    ? {
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }
    : {};
  React.useEffect(() => {
    document.addEventListener("scroll", (e) => {
      const b = e.target.scrollingElement.scrollTop;

      if (b > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });

    return () => {
      document.removeEventListener("scroll", () => {});
    };
  }, []);

  const HeaderView = React.useMemo(() => {
    if (!props?.isMobile) {
      return  <WebHeader {...props} />
    }

    return <MobileHeader {...props} />
  }, [props])
  return (
    <HeaderContainer
      style={{
        ...scrollStyle,
      }}
    >
      <Container
        sx={{
          px: -2,
        }}
      >
        {HeaderView}
      </Container>
    </HeaderContainer>
  );
}
