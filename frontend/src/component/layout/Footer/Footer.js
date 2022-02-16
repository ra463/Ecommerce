import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LanguageIcon from "@material-ui/icons/Language";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div id="footer">
        <div className="left-section">
          <a className="logo" href="/">
            <h1>
              <span>E</span>commerce<span>.</span>
            </h1>
          </a>
          <p>
            Thanks for visiting us.
            <div>Download our App.</div>
          </p>
        </div>
        <div className="mid-section">
          <h3 className="address">
            Address
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p>
            <LanguageIcon className="globe" /> H.no-608 Suhagi Adhartal
          </p>
          <p>Jabalpur Madhya Pradesh</p>
          <p>India</p>
          <p className="email">
            <MailOutlineIcon className="mail" /> rachitp507@gmail.com
          </p>
          <p className="phone">
            <PhoneAndroidIcon className="call" /> +91 0000 1111 1212
          </p>
        </div>
        <div className="mid-section1">
          <h3 className="links">
            Quick Links
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <ArrowRightAltIcon className="arrow" />
              <a href="/">Account Info</a>
            </li>
            <li>
              <ArrowRightAltIcon className="arrow" />
              <a href="/">New Arrivals</a>
            </li>
            <li>
              <ArrowRightAltIcon className="arrow" />
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <ArrowRightAltIcon className="arrow" />
              <a href="/">Our Blogs</a>
            </li>
            <li>
              <ArrowRightAltIcon className="arrow" />
              <a href="/">Payment </a>
            </li>
            <li>
              <ArrowRightAltIcon className="arrow" />
              <a href="/">Experts views</a>
            </li>
          </ul>
        </div>
        <div className="right-section">
          <h3 className="share">
            Follow Us..
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/rachit.patel.9047"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className="facebook" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/itzz_rp_here_/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon className="instagram" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="http://twitter.com/RachitInd"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon className="twitter" />
                <span>Twitter</span>{" "}
              </a>
            </li>
            <li>
              <a href="https://pinterest.com/" target="_blank" rel="noreferrer">
                <PinterestIcon className="pinterest" />
                <span>Pinterest</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="hr"></hr>
      <p className="copyright">
        Copyright Ⓒ &nbsp;<a href="/ecommerce">Ecommerce.</a> &nbsp; All Right
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
