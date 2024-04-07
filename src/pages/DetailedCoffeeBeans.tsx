import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RateBean from "../components/RateBean";
import DetailedBeanMap from "../components/DetailedBeanMap";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import { COLORS } from "../values/colors";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import "./DetailedCoffeeBeans.scss";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

type Coffee = {
  _id: string;
  name: string;
  brand: string;
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

const DetailedCoffeeBeans = (props: any) => {
  const [data, setData] = useState<Coffee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  let { id } = useParams();

  useEffect(() => {
    dispatch(isLoading());
    fetchDataForPosts();
  }, [id]);

  const fetchDataForPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // TODO: ESSENTIAL FOR jwt
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      setData(data.data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
      dispatch(notLoading());
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

  const SkeletonComponent = () => {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* left component */}
            <Grid item xs={12} sm={4}>
              <div className="item">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={200}
                  height={200}
                />
              </div>
              <Skeleton animation="wave" variant="text" width={200} />
              <Skeleton animation="wave" variant="text" width={200} />
            </Grid>
            {/* right component */}
            <Grid item xs={12} sm={8}>
              <Skeleton animation="wave" variant="text" width={200} />
              <Skeleton animation="wave" variant="text" width={200} />
              <div style={{ display: "flex" }}>
                <Skeleton animation="wave" variant="text" width={200} />
              </div>
              <Skeleton animation="wave" variant="text" width={200} />
              <Skeleton animation="wave" variant="text" width={200} />
              <div>
                <Skeleton animation="wave" variant="text" width={200} />
                <Skeleton animation="wave" variant="text" width={200} />
                <Skeleton animation="wave" variant="text" width={200} />
              </div>
              <Skeleton animation="wave" variant="text" width={200} />
              {data?.locations && (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={200}
                  height={400}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };

  const Traits = () => {
    const StyledRating = styled(Rating)({
      "& .MuiRating-iconFilled": {
        color: COLORS.darkGreen,
      },
      "& .MuiRating-iconHover": {
        color: "#ff3d47",
      },
    });
    return (
      <div className="traits">
        <p>
          Body:{" "}
          <StyledRating
            name="customized-color"
            readOnly
            value={data?.body}
            precision={0.1}
            icon={<LocalCafeIcon fontSize="inherit" />}
            emptyIcon={<LocalCafeIcon fontSize="inherit" />}
          />
          {data?.body}
        </p>
        <p>
          Acidity:
          <StyledRating
            name="customized-color"
            readOnly
            value={data?.acidity}
            precision={0.1}
            icon={<LocalCafeIcon fontSize="inherit" />}
            emptyIcon={<LocalCafeIcon fontSize="inherit" />}
          />
          {data?.acidity}
        </p>
        <p>
          Sweetness:{" "}
          <StyledRating
            name="customized-color"
            readOnly
            value={data?.ratingsAverage}
            precision={0.1}
            icon={<LocalCafeIcon fontSize="inherit" />}
            emptyIcon={<LocalCafeIcon fontSize="inherit" />}
          />
          {data?.ratingsAverage}
        </p>
      </div>
    );
  };

  console.log("data", data);

  return (
    <div>
      {loadingData ? (
        // {true ? (
        <SkeletonComponent />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} className="imageBookmarkRating">
              <div className="item">
                {
                  <img
                    src={data?.image || catchBeanBag}
                    width="200"
                    height="200"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    onError={addDefaultSrc}
                  />
                }
              </div>
              <Button variant="outlined" color="success">
                Save it
              </Button>
              {/* <RateBean maxStars={5} currentRating={data?.ratingsAverage} /> */}
              <Rating name="no-value" value={null} size="large" />
            </Grid>
            <Grid item xs={12} sm={8} className="restOfContent">
              <div className="aboveMap">
                <div className="title">{data?.name || "name"}</div>
                <div className="brand">{data?.brand || "brand"}</div>
                <div style={{ display: "flex" }} className="ratingWrapper">
                  {/* <p>Ratings in stars here pretty big</p> */}
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    value={data?.ratingsAverage}
                    size="large"
                    readOnly
                  />{" "}
                  {data?.ratingsAverage}
                  {/* <p>No of ratings: {data?.ratingsQuantity}</p> */}
                </div>
                <p>Origin: {data?.origin}</p>
                {/* flag maybe? */}
                <p>Processing: naturally washed</p>
                <p>QGrading: 85 points</p>
                <p>Altitude: 2821m </p>
                <Traits />
                <p>Flavour notes: CHOCOLTAE , NUTTY, SPICY </p>
              </div>
              {data?.locations && (
                <DetailedBeanMap location={data?.locations} />
              )}
              <div>
                <div className="articles">
                  <h2>Title</h2>
                  <p>
                    Aenean tincidunt quis sem nec luctus. Donec non interdum
                    eros. Phasellus facilisis facilisis eros, eu venenatis erat
                    eleifend eget
                  </p>
                </div>{" "}
                <div className="articles">
                  <h2>Title</h2>
                  <p>
                    Aenean tincidunt quis sem nec luctus. Donec non interdum
                    eros. Phasellus facilisis facilisis eros, eu venenatis erat
                    eleifend eget
                  </p>
                </div>{" "}
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default DetailedCoffeeBeans;
