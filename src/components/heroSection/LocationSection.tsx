import React from "react";
import "./LocationSection.scss";
import bigBean from "../../assets/image2.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

type Props = {};

const LocationSection = (props: Props) => {
  const navigate = useNavigate();
  const TextAndImage = () => {
    // TODO: Add parallax to text
    return (
      <div className="bean-text-hero-wrapper">
        <div className="behind-text">FROM FARM</div>
        <img
          src={bigBean}
          style={{ width: "10rem" }}
          className="hero-bean-image"
          alt="Pic of the coffee bean that is the result of search bar"
          loading="lazy"
          title="Image of the coffee bag"
        />
        <div className="text-lower-component">
          <div className="above-text" style={{ zIndex: "1" }}>
            TO
          </div>
          <div className="above-text">CUP</div>
        </div>
        <Button
          variant="outlined"
          size="large"
          className="map-button"
          onClick={() => navigate(`/locations`)}
        >
          To coffee map
        </Button>
      </div>
    );
  };

  return (
    <div className="location-parent-wrapper">
      {/* <h1>LocationSection</h1> */}
      <TextAndImage />
    </div>
  );
};

export default LocationSection;
