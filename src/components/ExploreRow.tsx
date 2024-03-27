import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRow.scss";

type Props = {
  data: Coffee;
};

type Coffee = {
  _id: string;
  name: string;
  origin: string;
  roastLevel: string;
  flavorNotes: string[];
  aroma: string;
  acidity: number;
  body: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  image: string;
  locations: {
    type: string;
    coordinates: number[];
    description: string;
    _id: string;
    id: string;
  }[];
  slug: string;
  id: string;
};

const ExploreRow: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src =
      "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/catchBeanBag.jpg";
  }

  const RowClickHandler = () => {
    navigate(`/coffee/${data._id}`);
  };

  return (
    <div className="wrapper" onClick={() => RowClickHandler()}>
      <img
        src={data?.image}
        width="100"
        height="100"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        onError={addDefaultSrc}
      />
      <h3>{data.name}</h3>
      <h3>Price: {data.price}$</h3>
    </div>
  );
};

export default ExploreRow;
