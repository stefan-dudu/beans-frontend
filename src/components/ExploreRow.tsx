import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRow.scss";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { COLORS } from ".././values/colors";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

type Props = {
  data: Coffee;
};

type Coffee = {
  _id: string;
  brand: string;
  type: string;
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
    e.currentTarget.src = catchBeanBag;
  }

  const RowClickHandler = () => {
    navigate(`/coffee/${data._id}`);
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: COLORS.darkGreen,
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  console.log("data", data);

  return (
    // <div className="wrapper" onClick={() => RowClickHandler()}>
    //   <div className="beanCard">
    //     <img
    //       src={data?.image || catchBeanBag}
    //       className="d-inline-block align-top beanImage"
    //       alt="React Bootstrap logo"
    //       onError={addDefaultSrc}
    //     />
    //     <div className="beanInfo">
    //       <div>{data?.name}</div>
    //       <div>
    //         <div>by: {data?.brand}</div>
    //         <div>{data?.type}</div>
    //       </div>
    //       <div className="propValue">CHOCOLTAE , NUTTY, SPICY </div>
    //     </div>
    //     <div className="beanRating">
    //       {" "}
    //       <div className="ratingsAndNo">
    //         <StyledRating
    //           name="customized-color"
    //           readOnly
    //           value={data?.ratingsAverage}
    //           precision={0.5}
    //           icon={<LocalCafeIcon fontSize="inherit" />}
    //           emptyIcon={<LocalCafeIcon fontSize="inherit" />}
    //         />
    //         <div className="reviewsNo">{data?.ratingsQuantity}</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="wrapper" onClick={() => RowClickHandler()}>
      <Box sx={{ flexGrow: 1 }} className="beanCard">
        <Grid container spacing={2}>
          <Grid item xs={5} sm={3} className="imageGrid">
            <img
              src={data?.image || catchBeanBag}
              className="d-inline-block align-top beanImage"
              alt="React Bootstrap logo"
              onError={addDefaultSrc}
              // width={100}
              // height={100}
            />
          </Grid>
          <Grid item xs={7} sm={6} className="beanInfoGrid">
            <div className="beanInfo">
              <div className="name">{data?.name}</div>
              <div>
                {/* <div className="propWrapper">
                  <div className="propName">Processing: </div>
                  <div className="propValue">Naturally washed</div>
                </div> */}
                <div className="info">by: {data?.brand}</div>
                <div className="info">Type: {data?.type}</div>
                <div className="info">Roast: {data?.roastLevel}</div>
              </div>
              <div className="flavs">CHOCOLTAE , NUTTY, SPICY </div>
            </div>
          </Grid>
          <Grid item xs={5} sm={1}></Grid>
          <Grid
            item
            xs={7}
            sm={2}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="beanRating">
              <div className="ratingsAndNo">
                <div className="rating">4.3</div>

                <StyledRating
                  name="customized-color"
                  readOnly
                  value={data?.ratingsAverage}
                  precision={0.5}
                  icon={<LocalCafeIcon fontSize="inherit" />}
                  emptyIcon={<LocalCafeIcon fontSize="inherit" />}
                />

                <div className="reviewsNo">{data?.ratingsQuantity} ratings</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
    // <div className="wrapper" onClick={() => RowClickHandler()}>
    //   <div className="beanCard">
    //     <img
    //       src={data?.image || catchBeanBag}
    //       className="d-inline-block align-top beanImage"
    //       alt="React Bootstrap logo"
    //       onError={addDefaultSrc}
    //     />
    //     <div className="beanInfo">
    //       <div>{data?.name}</div>
    //       <div>
    //         <div>by: {data?.brand}</div>
    //         <div>{data?.type}</div>
    //       </div>
    //       <div className="propValue">CHOCOLTAE , NUTTY, SPICY </div>
    //     </div>
    // <div className="beanRating">
    //   {" "}
    //   <div className="ratingsAndNo">
    //     <StyledRating
    //       name="customized-color"
    //       readOnly
    //       value={data?.ratingsAverage}
    //       precision={0.5}
    //       icon={<LocalCafeIcon fontSize="inherit" />}
    //       emptyIcon={<LocalCafeIcon fontSize="inherit" />}
    //     />
    //     <div className="reviewsNo">{data?.ratingsQuantity}</div>
    //   </div>
    //  </div>
    //   </div>
    // </div>
  );
};

export default ExploreRow;
