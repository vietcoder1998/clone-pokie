import styled from "@emotion/styled";
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LazyLoad from "react-lazyload";
import NoneDataImage from "../../assets/no-item.jpg";
import CareerLink from "../BLogLink";
import StatisticView from "./StatisticView";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import i18n from "../../i18n";
import { CheckPinJob } from "./../../helpers/pin/checkPin";

const CareerCardContainer = styled("div")(() => ({
  "&:hover": {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
  },
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  padding: "10px 10px",
  height: "100%",
  display: "flex",
  minHeight: '15vh'
}));

export default function CareerCard(props) {
  const { t } = i18n;
  React.useLayoutEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const innerDOM = document.getElementById(`div#${props?.id}`);

      innerDOM.innerHTML = props?.shortContent;
    });
  }, [props]);

  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    setAvatarUrl(["http://localhost:8080", NoneDataImage?.src].join(""));
  }, []);

  const DisplayImage = React.useMemo(() => {
    const isAvatar = Boolean(props?.coverUrl);
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Link
          href={`/career/${props?.slug}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isAvatar ? (
            <Image
              style={{
                height: "auto",
                borderRadius: 2,
                height: "auto",
              }}
              width={200}
              height={200}
              src={props?.coverUrl}
              alt={props?.title}
            />
          ) : (
            <Image
              style={{
                height: "auto",
              }}
              width={200}
              height={200}
              src={NoneDataImage}
              alt={props?.title}
            />
          )}
        </Link>
      </Box>
    );
  }, [avatarUrl, props?.coverUrl, props?.slug, props?.title]);

  const CareerHeader = () => {
    return (
      <Box
        className={"career-link"}
        component={"div"}
        sx={{
          pb: 1,
          pt: 1,
          width: "100%",
        }}
      >
        <CareerLink
          sx={{
            width: "100%",
          }}
          size="large"
          linkStyle={{
            clear: "both",
            width: "100%",
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          typoSx={{
            display: "grid",
          }}
          title={props?.title}
          href={`/career/${props?.slug}`}
        >
          {props?.title?.toLowerCase()}
        </CareerLink>
      </Box>
    );
  };

  const CareerShortContent = () => {
    return (
      <Box
        className={"career-link"}
        component={"div"}
        sx={{
          width: "100%",
        }}
      >
        {props?.shortContent}
      </Box>
    );
  };

  const CareerFooter = () => {
    return (
      <Box
        className="time-and-view"
        sx={{
          position: "absolute",
          bottom: 2,
          marginLeft: -1,
        }}
      >
        <Box
          {...props?.inputProps}
          name={props?.key}
          id={props?.id}
          sx={{
            ...props.sx,
            font: "auto",
            minHeight: 20,
            fontWeight: 300,
            fontSize: 14,
          }}
          disabled={props.status === -1}
        ></Box>
        <Box>
          <StatisticView {...props} />
        </Box>
      </Box>
    );
  };

  const CareerAvatar = () => {
    return (
      <Grid md={4} item>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#11111120",
          }}
          overflow={"hidden"}
        >
          {DisplayImage}
        </Box>
      </Grid>
    );
  };

  const CareerComponent = () => {
    return (
      <Grid md={8} item xs={6} pl={2}>
        <Box
          className="career-card"
          component={"div"}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            pb: 5,
            mb: 2,
          }}
        >
          <CareerHeader />
          <CareerShortContent></CareerShortContent>
          <CareerFooter />
        </Box>
      </Grid>
    );
  };

  const [pinList, setPinList] = React.useState(CheckPinJob.instance.getList());
  const onClickPin = () => {
    CheckPinJob.instance.onClickPin(props?.id);

    setPinList(CheckPinJob.instance.getList());
  };
  const JobPin = React.useMemo(() => {
    return (
      <Box>
        <IconButton onClick={onClickPin}>
          {pinList?.includes(props.id) ? (
            <PushPinIcon></PushPinIcon>
          ) : (
            <PushPinOutlinedIcon />
          )}
        </IconButton>
      </Box>
    );
  }, [pinList, onClickPin]);

  const DescriptionItem = () => (
    <Grid container spacing={2}>
      <Grid item={6}>
        <Typography>
          <b>{t("common.ui.location")}</b>
          <label>: </label>
          {props?.locations && (
            <label>
              {props?.locations?.map((location) => (
                <Chip key={location} size={"small"} label={location} />
              ))}
            </label>
          )}
          {!props.locations.length && <i>{t("common.ui.noDetected")}</i>}
        </Typography>
      </Grid>
      <Grid item={6}>
        <Typography>
          <b>{t("common.ui.applyQuantity")}</b>
          <label>: </label>
          <label>{props?.applies?.length ?? 0}</label>
        </Typography>
      </Grid>
      <Grid item={6}>
        <Typography>
          <b>{t("common.ui.job")}</b>
          <label>: </label>
          <i>{props?.job?.name ?? t("common.ui.noDetected")}</i>
        </Typography>
      </Grid>
      <Grid item={6}>
        <Typography>
          <b>{t("common.ui.company")}</b>
          <label>: </label>
          <i>{props?.company?.name ?? t("common.ui.noDetected")}</i>
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <LazyLoad>
      <CareerCardContainer>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Grid container>
              <CareerAvatar />
              <CareerComponent />
            </Grid>
          </Grid>
          <Grid item md={4} mt={2}>
            <DescriptionItem />
          </Grid>
        </Grid>
        {JobPin}
      </CareerCardContainer>
    </LazyLoad>
  );
}
