import React, { SyntheticEvent } from "react";
import farmer from "../assets/farmer.avif";
import catchBeanBag from "../assets/catchBeanBag.webp";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./Discover.scss";

type Props = {};

const Discover = (props: Props) => {
  const navigate = useNavigate();
  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }
  return (
    <div className="discoverWrapper">
      <div className="leftDiscover">
        <img
          src={farmer || catchBeanBag}
          className="d-inline-block"
          alt="A vietnamese coffee farmer"
          onError={addDefaultSrc}
          style={{ width: "24vw" }}
          loading="lazy"
          title="Image of a coffee farmer"
          onClick={() => navigate(`/country/VNM`)}
        />
        <div className="textDiscover" onClick={() => navigate(`/country/VNM`)}>
          <div>The Tale of Vietnamese Coffee Farmers</div>
        </div>
      </div>
      <div className="rightDiscover">
        <Button
          variant="outlined"
          color="success"
          onClick={() => navigate(`/country/VNM`)}
        >
          Explore Now
        </Button>{" "}
      </div>
    </div>
  );
};

export default Discover;
