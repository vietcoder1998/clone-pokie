import React from "react";
import ImageContainerModal from "../ImageContainerModal";
import { Box } from "@mui/material";

export default function ImageModal({ careerDetail, viewId = "career-view" }) {
  const [visible, setVisible] = React.useState(false);
  const onShow = () => setVisible(true);
  const onHide = () => setVisible(false);
  const [viewImages, setViewImages] = React.useState([]);
  const [viewPosition, setViewPosition] = React.useState(0);

  React.useEffect(() => {
    const careerView = document.querySelector(`#${viewId}`);

    if (careerView) {
      const imageNodes = careerView.getElementsByTagName("img");
      const images = Object.values(imageNodes ?? {});

      if (images.length > 0) {
        images.forEach((img, index) => {
          img.setAttribute("data-position", index);
        });

        setViewImages(images);
      }

      careerView.addEventListener("mousedown", (e) => {
        if (e && e?.target?.tagName === "IMG") {
          const position = e?.target.getAttribute("data-position");

          setViewPosition(position);
          setClickImage(e?.target);
          onShow();
        }
      });
    }

    return () => {
      const careerView = document.querySelector(`#${viewId}`);

      if (careerView) {
        careerView.removeEventListener("click", () => {
          return;
        });
      }
    };
  }, [careerDetail, viewId]);

  const [clickImage, setClickImage] = React.useState("");
  const viewImage = React.useMemo(() => {
    return viewImages[viewPosition];
  }, [viewImages, viewPosition]);

  return (
    <ImageContainerModal onClose={onHide} visible={visible}>
      <Box padding={2}>
        <img src={viewImage?.src ?? clickImage?.src} alt={careerDetail?.title} />
      </Box>
    </ImageContainerModal>
  );
}
