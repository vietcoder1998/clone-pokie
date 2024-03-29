import { FacebookShareButton, FacebookIcon } from "react-share";

export default function FacebookShare({ link, quote, description }) {
  return (
    <FacebookShareButton
      url={link}
      quote={quote}
      description={description}
      className="Demo__some-network__share-button"
    >
      <FacebookIcon size={32} round /> Facebook share
    </FacebookShareButton>
  );
}
