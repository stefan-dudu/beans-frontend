import React, { useEffect, useState } from "react";
import "./LocationSection.scss";
import bigBean from "../../assets/image2.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LocationSection = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const TextAndImage = () => {
    // Limit the parallax effects to a small range
    const textTranslate = Math.min(scrollY * 0.2, 20); // Max 20px translation
    const imageTranslate = Math.min(scrollY * 0.1, 10); // Max 10px translation

    return (
      <div className="bean-text-hero-wrapper">
        <div
          className="behind-text"
          style={{ transform: `translateY(${textTranslate}px)` }}
        >
          FROM FARM
        </div>
        <img
          src={bigBean}
          style={{
            width: "10rem",
            transform: `translateY(${imageTranslate}px)`,
          }}
          className="hero-bean-image"
          alt="Pic of the coffee bean that is the result of search bar"
          loading="lazy"
          title="Image of the coffee bag"
        />
        <div className="text-lower-component">
          <div
            className="above-text"
            style={{ transform: `translateY(${textTranslate}px)`, zIndex: "1" }}
          >
            TO
          </div>
          <div
            className="above-text"
            style={{ transform: `translateY(${textTranslate}px)` }}
          >
            CUP
          </div>
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
      <TextAndImage />
    </div>
  );
};

export default LocationSection;
