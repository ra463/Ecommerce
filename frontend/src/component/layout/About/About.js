import React from "react";
import "./aboutSection.css";
import { Button, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/itzz_rp_here_/";
  };
  return (
    <div className="aboutSection">
      <div className="aboutSectionContainer">
        <h1>About Me</h1>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="/Profile.png"
              alt="Founder"
            />
            <h2>Rachit Patel</h2>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <h3>This is a sample wesbite made by Rachit Patel.</h3>
          </div>
          <div className="aboutSectionContainer2">
            <h2 component="h2">Find Me</h2>
            <a
              href="https://www.facebook.com/rachit.patel.9047"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className="facebook" />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/itzz_rp_here_/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon className="instagram" />
              <span>Instagram</span>
            </a>

            <a
              href="http://twitter.com/RachitInd"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon className="twitter" />
              <span>Twitter</span>{" "}
            </a>

            <a href="https://pinterest.com/" target="_blank" rel="noreferrer">
              <PinterestIcon className="pinterest" />
              <span>Pinterest</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
