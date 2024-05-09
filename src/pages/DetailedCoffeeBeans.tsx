import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RateBean from "../components/RateBean";
import DetailedBeanMap from "../components/map/DetailedBeanMap";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import catchBeanBag from "../assets/catchBeanBag.webp";
import { COLORS } from "../values/colors";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import "./DetailedCoffeeBeans.scss";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ReviewsComponent from "../components/ReviewsComponent";
import { CoffeeType } from "../types/Coffee";
import WrittenReview from "../components/WrittenReview";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Helmet } from "react-helmet-async";

const DetailedCoffeeBeans = (props: any) => {
  const [data, setData] = useState<CoffeeType | null>(null);
  const [value, setValue] = React.useState<number | null>(0);
  const [reviewText, setReviewText] = React.useState<string | null>("");
  const [ratingId, setRatingId] = React.useState<string | null>("");
  const [isFavourite, setIsFavourite] = React.useState<boolean>(false);
  const [favouriteId, setFavouriteId] = React.useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.id);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(isLoading());
    fetchDataForPosts();
    loggedIn && fetchUsersRatingForBean();
    loggedIn && fetchUsersSavedBean();
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
    } catch (err: any) {
    } finally {
      setLoading(false);
      dispatch(notLoading());
    }
  };

  const fetchUsersRatingForBean = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/reviews/${id}/${userId}`,
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
      if (data && data.review.length > 0) {
        setValue(data.review[0].rating);
        setReviewText(data.review[0].review);
        setRatingId(data.review[0].id);
      }
    } catch (err: any) {
    } finally {
    }
  };

  const createSaveBeanStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/saved-beans`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            bean: id,
            user: userId,
            favourite: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      console.log("Data from request:", data);
      setIsFavourite((prevCheck) => !prevCheck);
    } catch (err: any) {
      if (err && !loggedIn) {
        // console.log("redirect to login");
        navigate(`/login`, { replace: true });
      }
    } finally {
    }
  };

  const updateSaveBeanStaus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/saved-beans/${favouriteId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            favourite: !isFavourite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      console.log("Data from request:", data);
      setIsFavourite((prevCheck) => !prevCheck);
    } catch (err: any) {
      if (err && !loggedIn) {
        // console.log("redirect to login");
        navigate(`/login`, { replace: true });
      }
    } finally {
    }
  };

  const fetchUsersSavedBean = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/saved-beans/${id}/${userId}`,
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
      data && data?.savedItem[0]?.favourite === true
        ? setIsFavourite(true)
        : setIsFavourite(false);

      if (data && data?.savedItem.length > 0) {
        setFavouriteId(data?.savedItem[0]?._id);
      }

      // console.log("is bean saved", data?.savedItem.length > 0);
      // console.log("is bean saved", data?.savedItem[0]?.favourite === true);
      // if (data && data.review.length > 0) {
      //   setValue(data.review[0].rating);
      //   setReviewText(data.review[0].review);
      //   setRatingId(data.review[0].id);
      // }
    } catch (err: any) {
      console.log("err", err);
    } finally {
      // navigate(0);
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
              value={data?.sweetness}
              precision={0.1}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
            />{" "}
            {data?.sweetness}
          </div>
        </div>
      </div>
    );
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: COLORS.darkGreen,
    },
    "& .MuiRating-iconHover": {
      color: COLORS.darkGreen,
    },
  });

  // data && console.log(data);

  return (
    <div>
      <Helmet>
        <title>
          Baristretto: {`${data?.brand} ${data?.name}`} reviews and informations
        </title>
        <meta
          name="description"
          content={`Discover more informations and reviews about this coffe. It's a ${data?.type} from ${data?.origin}, with a ${data?.roastLevel} roast level.`}
        />
        <link rel="canonical" href={`/coffee`} />
      </Helmet>
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
                    alt={`Coffee bean pic, it this case is  ${data?.brand} ${data?.name}`}
                    onError={addDefaultSrc}
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                    title={`${data?.brand} ${data?.name}`}
                  />
                }
              </div>
              <Button
                variant={isFavourite ? "outlined" : "contained"}
                endIcon={<FavoriteIcon />}
                color="success"
                onClick={() => {
                  if (favouriteId) {
                    console.log("data is saved so we will have to update it");
                    updateSaveBeanStaus();
                  } else if (!favouriteId) {
                    console.log("there is no data so we will create it");
                    createSaveBeanStatus();
                  }
                }}
              >
                {isFavourite ? "Favourite " : "Add to favourite"}
              </Button>
              <div className="rating-and-CTA">
                <RateBean
                  maxStars={5}
                  currentRating={data?.ratingsAverage}
                  usersRating={value}
                  ratingId={ratingId}
                />
                {value !== null && value === 0 ? (
                  <div style={{ color: "#006241" }}>Rate this coffee</div>
                ) : (
                  <div>Rated</div>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={8} className="restOfContent">
              <div className="aboveMap">
                <div className="title">{data?.name || "name"}</div>
                <div className="brand">{data?.brand || "brand"}</div>
                <div style={{ display: "flex" }} className="ratingWrapper">
                  {!!data?.ratingsAverage && (
                    <StyledRating
                      name="half-rating-read"
                      // defaultValue={2.5}
                      precision={0.5}
                      value={data?.ratingsAverage}
                      size="large"
                      icon={<LocalCafeIcon fontSize="inherit" />}
                      emptyIcon={<LocalCafeIcon fontSize="inherit" />}
                      readOnly
                    />
                  )}
                  {!!data?.ratingsAverage && data?.ratingsAverage}
                </div>
                {data?.origin && (
                  <div className="propWrapper">
                    <div className="propName">Origin: </div>
                    <div className="propValue">{data?.origin}</div>
                    {/* flag maybe? */}
                  </div>
                )}
                {data?.type && (
                  <div className="propWrapper">
                    <div className="propName">Type: </div>
                    <div className="propValue">{data?.type}</div>
                  </div>
                )}
                {data?.roastLevel && (
                  <div className="propWrapper">
                    <div className="propName">Roast level: </div>
                    <div className="propValue">{data?.roastLevel}</div>
                  </div>
                )}
                {data?.processing && (
                  <div className="propWrapper">
                    <div className="propName">Processing: </div>
                    <div className="propValue">{data?.processing}</div>
                  </div>
                )}
                {data?.qGrading && (
                  <div className="propWrapper">
                    <div className="propName">QGrading: </div>
                    <div className="propValue">{data?.qGrading}</div>
                  </div>
                )}
                {data && data?.altitude > 200 && (
                  <div className="propWrapper">
                    <div className="propName">Altitude:</div>
                    <div className="propValue">{data?.altitude} m</div>
                  </div>
                )}
                <Traits />
                {data && data?.flavorNotes.length > 0 && (
                  <div className="propWrapper">
                    <div className="propName">Flavour notes: </div>
                    <div className="flavorNotes">
                      {data &&
                        data?.flavorNotes.map((el) => <div key={el}>{el}</div>)}
                    </div>
                  </div>
                )}
                <WrittenReview
                  usersRating={value}
                  reviewText={reviewText}
                  ratingId={ratingId}
                />
              </div>
              {data?.locations && (
                <DetailedBeanMap location={data?.locations} key={data?._id} />
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
