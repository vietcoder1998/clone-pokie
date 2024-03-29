import Image from "next/image";
import PokiLogo from "./../../../../assets/poki-log.png";
import FlashSelect from "./../../../../assets/flash-select.png";
import { Version } from "./Version";

export default function CustomFooter() {
  return (
    <div style={{ marginTop: 60 }}>
      <div
        className="clip-path-container"
        style={{ height: 26, width: "100%", marginBottom: -1 }}
      >
        <div
          className="clip-path"
          style={{
            background: "white",
            height: "100%",
            clipPath: "polygon(0 100%,30% 0,36% 100%,100% 0,100% 100%)",
          }}
        ></div>
      </div>
      <div className="footer-container">
        <div
          className="let-play"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div className="nDlYEPwiwt1Ocy1EY4QY">
            <a
              href="https://about.poki.com/"
              rel="noopener"
              target="_blank"
              className="C9JUSu6VaKM5y0Kq4sg2"
            >
              <Image width={50} height={24} src={PokiLogo} />
            </a>
          </div>
          <span className="jX1Y8HMEoQ0MUS7LKDJi">Let the world play</span>
        </div>
        <div className="link-container" sx={{ justifyContent: "center" }}>
          <a
            href="https://about.poki.com"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            About
          </a>
          <a
            href="https://developers.poki.com"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            Poki for Developers
          </a>
          <a
            href="https://jobs.poki.com"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            Jobs
          </a>
          <a
            href="https://kids.poki.com"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            Poki Kids
          </a>
          <a
            href="/en/c/global-privacy-statement"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            Privacy Statement
          </a>
          <a
            href="/en/c/global-cookie-statement"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            Cookie Statement
          </a>
          <a
            href="/en/c/global-terms-of-use"
            rel="noopener nofollow"
            target="_blank"
            className="qMWRUBS9td2nFBRm5ow7"
          >
            Terms of Use
          </a>
          <a href="/en/c/faq" className="qMWRUBS9td2nFBRm5ow7">
            FAQ
          </a>
          <a href="/en/c/contact" className="qMWRUBS9td2nFBRm5ow7">
            Contact
          </a>
          <a href="/en/c/contact" className="qMWRUBS9td2nFBRm5ow7">
            <Image src={FlashSelect} width={40} />
          </a>
        </div>
      </div>
      <Version />
    </div>
  );
}
