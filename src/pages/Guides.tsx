import React from "react";
import GuideCardComponent from "../components/GuideCardComponent";
import "./Guides.scss";

type Props = {};

const Guides = (props: Props) => {
  return (
    <div className="guidesParent">
      <div className="guidesTitle">
        Future page of tips, guides and helpful informations
      </div>
      <div className="guideCardCompWrapper">
        <GuideCardComponent page="a" />
        <GuideCardComponent page="b" />
      </div>
    </div>
  );
};

export default Guides;
