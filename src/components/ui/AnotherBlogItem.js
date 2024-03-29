import styled from "@emotion/styled";
import { MessageRounded, Visibility } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const AnotherBlogTitle = styled("p")(() => ({
  fontSize: "1.2rem",
}));

const AnotherDataSection = styled("p")(() => ({
  fontSize: "1.2rem",
}));

const AnotherBlogContainer = styled("p")(() => ({
  display: "flex",
  padding: `5px 20px`,
}));

export function AnotherBlogItem(props) {
  return (
    <AnotherBlogContainer>
      <AnotherBlogTitle component={"p"}>
        <Link href={`/${props?.link}`}>
          <Typography>{props?.title}</Typography>
        </Link>
      </AnotherBlogTitle>
      <Box sx={{ display: "flex" }}>
        <AnotherDataSection className={"flex center"}>
          <Visibility />
          <Typography component="span">{props?.view}</Typography>
        </AnotherDataSection>
        <AnotherDataSection>
          <MessageRounded />
          <Typography component="span">{props?.totalComment ?? 0}</Typography>
        </AnotherDataSection>
      </Box>
    </AnotherBlogContainer>
  );
}
