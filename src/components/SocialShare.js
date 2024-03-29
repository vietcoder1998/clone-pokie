import styled from "@emotion/styled";
import { Facebook } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const SharingListContainer = styled("div")(() => ({
  left: 300,
  top: 400,
  mt: 2,
  paddingTop: 40,
}));

export default function SharingList({ link, quote, description, t }) {
  return (
    <SharingListContainer>
      <Typography style={{ marginRight: 10, fontSize: "1.1rem" }}>
        <b>{t("pages.blog.share")}</b>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <div
          data-href={window.location.href}
          data-layout=""
          data-size="22"
          style={{
            display: "flex",
            justifyContent: "column",
            color: "#1877F2",
          }}
        >
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
              link
            )}`}
            className="fb-xfbml-parse-ignore"
            rel="noreferrer"
            aria-label="Share on facebook"
          >
            <Facebook></Facebook>
          </a>
        </div>
      </Box>
    </SharingListContainer>
  );
}
