import React from "react";
import bean1 from "../assets/bean1.jpg";
import bean2 from "../assets/bean2.jpg";
import bean3 from "../assets/bean3.jpg";
import "./TopItems.scss";
import logo from "../assets/logo2.png";

type Props = {};

const TopItems = (props: Props) => {
  return (
    <div>
      <h2>Top beans </h2>
      <div className="container">
        <div className="item">
          {
            <img
              src={bean1}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean2}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean3}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={
                "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/ethiopian-yirgacheffe.jpg"
              }
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={
                "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/kenyan-aa.jpg"
              }
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean3}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>{" "}
        <div className="item">
          {
            <img
              src={bean1}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean2}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean3}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>{" "}
        <div className="item">
          {
            <img
              src={bean1}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean2}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
        <div className="item">
          {
            <img
              src={bean3}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          }
        </div>
      </div>
    </div>
  );
};

export default TopItems;
