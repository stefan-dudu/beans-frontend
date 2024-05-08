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
        srcSet={`${data?.image} 1x, ${data?.image} 2x`}
        alt={`Coffee bean pic, it this case is  ${data?.brand} ${data?.name}`}
        onError={addDefaultSrc}
        loading="lazy"
        fetchpriority="high"
        title={`${data?.brand} ${data?.name}`}
      />
      <div className="underPic">
        <h2 className="title">{data?.name}</h2>
        <h3 className="brand">{data?.brand}</h3>
        <div className="ratingsAndNo">
          <StyledRating
            name="customized-color"
            readOnly
            value={data?.ratingsAverage}
            precision={0.5}
            icon={<LocalCafeIcon fontSize="inherit" />}
            emptyIcon={<LocalCafeIcon fontSize="inherit" />}
          />
          <h3 className="reviewsNo">{data?.ratingsQuantity}</h3>
        </div>
        <h3 className="origin">{data?.origin}</h3>
      </div>
    </Link>
  );
};

export default BeanCard;
