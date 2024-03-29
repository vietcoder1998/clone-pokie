import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import i18n from "../../../../../i18n";

const ProductionContainer = styled("div")(() => ({}));

const ProductionLink = styled("p")(() => ({
  fontSize: "0.8rem",
  ":a": {
    color: "black",
    textDecoration: "none",
  },
}));

const ProductionHeader = styled("p")(() => ({
  fontSize: "1.2rem",
}));

export default function OutProduction() {
  const { t } = i18n;
  const productionList = [
    {
      name: t("common.footer.vietblog"),
      link: "https://vietblog.io.vn",
    },
  ];
  return (
    <ProductionContainer>
      <ProductionHeader>{t("common.footer.outProduction")}</ProductionHeader>
      {productionList.map((item) => (
        <ProductionLink>
          <Link
            href={item.link}
            target={"_blank"}
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>
        </ProductionLink>
      ))}
    </ProductionContainer>
  );
}
