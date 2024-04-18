import React, { SyntheticEvent } from "react";
import farmer from "../assets/farmer.avif";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import Button from "@mui/material/Button";
import "./Discover.scss";

type Props = {};

const Discover = (props: Props) => {
  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }
  return (
    <div className="discoverWrapper">
      <div className="leftDiscover">
        <img
          src={farmer || catchBeanBag}
          className="d-inline-block"
          alt="React Bootstrap logo"
          onError={addDefaultSrc}
          style={{ maxWidth: "30vw" }}
        />
        <div className="textDiscover">
          <div>The Tale of Vietnamese Coffee Farmers</div>
          {/* <div>A Glimpse into Tradition, Challenges, and Resilience</div> */}
        </div>
      </div>
      <div className="rightDiscover">
        <Button variant="outlined" color="success">
          Explore Now
        </Button>{" "}
      </div>
    </div>
  );
};

export default Discover;
