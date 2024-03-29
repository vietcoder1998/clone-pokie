import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { onUploadImageDataUrl } from "../../hooks/useFirebase";

export default function UploadImage({ onUploadImage, defaultUrl }) {
  const [uploadImage, setUploadImage] = React.useState({
    url: "",
    file: "",
    selectedFile: [],
  });
  const onLoadImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const fileUrl = reader.readAsDataURL(file);

    reader.onloadend = (ev) => {
      const selectedFile = [reader.result];

      onUploadImageDataUrl(reader.result, file.name).then((data) => {
        if (onUploadImage) {
          onUploadImage(data);
        }
      });
      setUploadImage({
        file,
        url: fileUrl,
        selectedFile,
      });
    };
  };
  const onClearImage = (e) => {
    setUploadImage({
      url: "",
      file: "",
      selectedFile: [],
    });
  };

  return (
    <Box>
      <Box>
        <input type="file" onChange={onLoadImgFile} />
        <IconButton onClick={onClearImage}>
          <CloseOutlined />
        </IconButton>
      </Box>
      {defaultUrl || uploadImage?.selectedFile?.length ? (
        <img
          style={{ border: "solid gray 1px" }}
          src={defaultUrl ?? uploadImage.selectedFile}
          alt="upload"
          width={200}
        />
      ) : (
        ""
      )}
    </Box>
  );
}
