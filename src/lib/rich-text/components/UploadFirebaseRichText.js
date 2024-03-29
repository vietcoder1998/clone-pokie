import { Typography } from "@mui/material";
import React from "react";
import { onUploadImageDataUrl } from "../../../hooks/useFirebase";

export default function UploadImage(props) {
  const onLoadImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = (ev) => {
      onUploadImageDataUrl(reader.result, file.name).then((data) => {
        props.onUploadImage(data?.url);
      });
    };
  };
  return (
    <>
      <Typography
        component={"label"}
        sx={{ display: "flex" }}
        htmlFor="firebaseUpload"
      >
        {props?.children}
      </Typography>
      <input
        type="file"
        onChange={onLoadImgFile}
        hidden={true}
        id={"firebaseUpload"}
      />
    </>
  );
}
