import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GuidePage.scss";

type Props = {};

const GuidePage = (props: Props) => {
  let { name } = useParams();
  console.log(name, "name");
  return <div>GuidePage: {name}</div>;
};

export default GuidePage;
