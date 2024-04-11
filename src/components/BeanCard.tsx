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
    color: "#ff3d47",
  },
});

{
  /* <div className="wrapper" onClick={() => RowClickHandler()}>
  <div className="beanCard">
    <img
      src={data?.image || catchBeanBag}
      className="d-inline-block align-top beanImage"
      alt="React Bootstrap logo"
      onError={addDefaultSrc}
    />
    <div className="beanInfo">
      <div>{data?.name}</div>
      <div>
        <div>by: {data?.brand}</div>
        <div>{data?.type}</div>
      </div>
      <div className="propValue">CHOCOLTAE , NUTTY, SPICY </div>
    </div>
    <div className="beanRating">
      {" "}
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
    </div>
  </div>
</div>; */
}

const BeanCard = ({ data }: { data: Coffee }) => {
  // function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
  //   e.currentTarget.src = catchBeanBag;
  // }

  return (
    <Link to={`/coffee/${data._id}`} key={data._id} className="parentWrapper">
      <img
        className="image"
        src={data?.image || catchBeanBag}
        alt="React Bootstrap logo"
        // onError={addDefaultSrc}
      />
      <div className="underPic">
        <div className="title">{data?.name}</div>
        <p style={{ color: "lightgrey" }}>{data?.brand}</p>
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
