import React from "react";
import "./FirstSection.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

type Props = {};

const FirstSection = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="video-parent-wrapper">
      <h1>Coffee reviews and informations</h1>
      <video
        className="video"
        id="video"
        autoPlay
        loop
        controls={false}
        playsInline
        muted
        preload="auto"
      >
        <source src="https://baristretto-bucket.s3.eu-central-1.amazonaws.com/misc/video1-1920.mp4" />
      </video>
      <Button
        variant="outlined"
        color="success"
        size="large"
        className="hero-button"
        onClick={() => navigate(`/coffee/6617c40592e870098a5f0329`)}
      >
        Explore
      </Button>
    </div>
  );
};

export default FirstSection;
