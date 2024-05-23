import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./CatchPage.scss";

type Props = {};

const CatchPage = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="parent-wrapper">
      <h1>Oooops </h1>
      <h1>This page is having a coffee ...</h1>
      <h2>So should you</h2>
      <img
        src={
          "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/misc/cup.gif"
        }
        width="200"
        height="200"
        className="d-inline-block align-top"
        alt={`Espresso in progress`}
        style={{ objectFit: "contain" }}
        loading="lazy"
        title={`Espresso in progress`}
      />
      <div className="buttons-container">
        <h2>Let's get started: </h2>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            navigate(`/explore`);
          }}
        >
          More options to love
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            navigate(`/locations`);
          }}
        >
          Discover the source of your coffee
        </Button>

        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            navigate(`/contact`);
          }}
        >
          Contact us!
        </Button>
      </div>
    </div>
  );
};

export default CatchPage;
