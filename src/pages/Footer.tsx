import React from "react";
import "./Footer.scss";
import react from "../assets/react.png";
import vercel from "../assets/vercel.png";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  const LeftComponent = () => {
    return (
      <div className="first-row-component">
        <div style={{ color: "darkgreen" }}>Baristretto</div>
        <div style={{ textAlign: "center" }}>
          Honest coffee reviews & more...
        </div>
      </div>
    );
  };

  const MiddleComponent = () => {
    return (
      <div className="first-row-component">
        <h3 style={{ color: "darkgreen" }}>Links</h3>
        <div className="links-container">
          <Link to="/contact">Contact</Link>
          <Link to="/about-us">Story</Link>
          <Link to="/next-features">Next features</Link>
        </div>
      </div>
    );
  };

  const RightComponent = () => {
    return (
      <div className="first-row-component">
        <div className="description-text">
          Welcome to Baristretto, where you can find detailed and honest coffee
          reviews. Discover your next favorite brew with insights from a
          passionate developer. Have questions or want to chat? Feel free to
          email me anytime
          <a
            href="mailto:stefan01.dev@gmail.com"
            style={{ color: "darkgreen" }}
          >
            {" "}
            here
          </a>{" "}
          !
        </div>
      </div>
    );
  };

  const BottomLeft = () => {
    return (
      <div>
        <div className="bottom-left">Copyright © 2024 Baristretto.</div>
        <div className="bottom-left">All rights reserved Baristretto.</div>
      </div>
    );
  };

  const BottomRight = () => {
    return (
      <div className="logos-wrapper">
        <img
          src={react}
          alt={`React logo`}
          loading="lazy"
          title={`React`}
          width={50}
          height={50}
        />
        <img
          src={vercel}
          alt={`Vercel logo`}
          loading="lazy"
          title={`Vercel`}
          width={100}
          height={"auto"}
        />
      </div>
    );
  };

  return (
    <div>
      <hr />
      <div className={"footer-wrapper"}>
        <LeftComponent />
        <MiddleComponent />
        <RightComponent />
      </div>
      <hr />
      <div className={"footer-wrapper"}>
        <BottomLeft />
        <BottomRight />
      </div>
    </div>
  );
};

export default Footer;
