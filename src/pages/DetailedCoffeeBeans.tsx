import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RateBean from "../components/RateBean";
import DetailedBeanMap from "../components/map/DetailedBeanMap";
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
import Grid from "@mui/material/Grid";
import ReviewsComponent from "../components/ReviewsComponent";
import { CoffeeType } from "../types/Coffee";

const DetailedCoffeeBeans = (props: any) => {
  const [data, setData] = useState<CoffeeType | null>(null);
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
            <Grid item xs={12} sm={4} className="imageBookmarkRating">
              <div className="item">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={200}
                  height={200}
                />
              </div>
              <Skeleton animation="wave" variant="text" width={"50%"} />
              <Skeleton animation="wave" variant="text" width={"50%"} />
            </Grid>
            {/* right component */}
            <Grid item xs={12} sm={8} className="r">
              <div className="aboveMap">
                <Skeleton animation="wave" variant="text" width={"60vw"} />
                <Skeleton animation="wave" variant="text" width={"100%"} />
                <div style={{ display: "flex" }}>
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                </div>
                <Skeleton animation="wave" variant="text" width={"100%"} />
                <Skeleton animation="wave" variant="text" width={"100%"} />
                <div>
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    height={200}
                  />
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={"100%"}
                    height={400}
                  />
                </div>
              </div>
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
        <div className="propWrapper">
          <div className="propName">Body: </div>
          <div className="propValue">
            <StyledRating
              name="customized-color"
              readOnly
              value={data?.body}
              precision={0.1}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
            />
            {data?.body}
          </div>
        </div>
        <div className="propWrapper">
          <div className="propName">Acidity: </div>

          <div className="propValue">
            <StyledRating
              name="customized-color"
              readOnly
              value={data?.acidity}
              precision={0.1}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
            />{" "}
            {data?.acidity}
          </div>
        </div>
        <div className="propWrapper">
          <div className="propName">Sweetness: </div>
          {/* TODO: alternative or another one INTENSITY */}
          <div className="propValue">
            <StyledRating
              name="customized-color"
              readOnly
              value={data?.ratingsAverage}
              precision={0.1}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
            />{" "}
            {data?.ratingsAverage}
          </div>
        </div>
      </div>
    );
  };

  const mapFlavorNotesToParagraphs = (coffee: CoffeeType): JSX.Element[] => {
    return coffee.flavorNotes.map((flavorNote) => (
      <p key={flavorNote}>{flavorNote}</p>
    ));
  };

  // console.log("data", data);

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
              <RateBean maxStars={5} currentRating={data?.ratingsAverage} />
              {/* <Rating name="no-value" value={null} size="large" /> */}
              {/* TODO: if rated or not status */}
              {/* <p>Rated, write a review / Rate this coffee</p> */}
            </Grid>
            <Grid item xs={12} sm={8} className="restOfContent">
              <div className="aboveMap">
                <div className="title">{data?.name || "name"}</div>
                <div className="brand">{data?.brand || "brand"}</div>
                <div style={{ display: "flex" }} className="ratingWrapper">
                  {/* <p>Ratings in stars here pretty big</p> */}

                  {!!data?.ratingsAverage && (
                    <Rating
                      name="half-rating-read"
                      // defaultValue={2.5}
                      precision={0.5}
                      value={data?.ratingsAverage}
                      size="large"
                      readOnly
                    />
                  )}
                  {!!data?.ratingsAverage && data?.ratingsAverage}
                  {/* <p>No of ratings: {data?.ratingsQuantity}</p> */}
                </div>
                <div className="propWrapper">
                  <div className="propName">Origin: </div>
                  <div className="propValue">{data?.origin}</div>
                  {/* flag maybe? */}
                </div>
                <div className="propWrapper">
                  <div className="propName">Type: </div>
                  <div className="propValue">{data?.type}</div>
                </div>
                <div className="propWrapper">
                  <div className="propName">Processing: </div>
                  <div className="propValue">{data?.processing}</div>
                </div>
                {/*  */}
                <div className="propWrapper">
                  <div className="propName">QGrading: </div>
                  <div className="propValue">{data?.qGrading}</div>
                </div>
                <div className="propWrapper">
                  <div className="propName">Altitude:</div>
                  <div className="propValue">{data?.altitude} m</div>
                </div>
                <Traits />
                <div className="propWrapper">
                  <div className="propName">Flavour notes: </div>
                  <div className="flavorNotes">
                    {data && data?.flavorNotes.map((el) => <div>{el}</div>)}
                  </div>
                </div>
              </div>
              {data?.locations && (
                <DetailedBeanMap location={data?.locations} />
              )}
              {/* TODO: CTA */}
              {/* <div>Call to action: Add review</div> */}
              <ReviewsComponent />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default DetailedCoffeeBeans;
