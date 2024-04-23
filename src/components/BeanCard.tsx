import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { COLORS } from ".././values/colors";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

type Coffee = {
  _id: string;
  name: string;
  brand: string;
  origin: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  image: string;
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: COLORS.darkGreen,
  },
  "& .MuiRating-iconHover": {
    color: COLORS.darkGreen,
  },
});

const BeanCard = ({ data }: { data: Coffee }) => {
  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

  return (
    <Link to={`/coffee/${data._id}`} key={data._id} className="parentWrapper">
      <img
        className="image"
        src={data?.image || catchBeanBag}
        alt="React Bootstrap logo"
        onError={addDefaultSrc}
      />
      <div className="underPic">
        <div className="title">{data?.name}</div>
        <div style={{ color: "lightgrey" }}>{data?.brand}</div>
        <div className="ratingsAndNo">
          <StyledRating
            name="customized-color"
            readOnly
            value={data?.ratingsAverage}
            precision={0.5}
            icon={<LocalCafeIcon fontSize="inherit" />}
            emptyIcon={<LocalCafeIcon fontSize="inherit" />}
          />
          <div className="reviewsNo">{data?.ratingsQuantity}</div>
        </div>
        <div className="origin">{data?.origin}</div>
      </div>
    </Link>
  );
};

export default BeanCard;
