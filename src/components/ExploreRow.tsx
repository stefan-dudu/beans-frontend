import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRow.scss";
import catchBeanBag from "../assets/catchBeanBag.webp";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { COLORS } from ".././values/colors";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CoffeeType } from "../types/Coffee";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import { findFlagUrlByCountryName } from "country-flags-svg-v2";

type Props = {
  data: CoffeeType;
};

const ExploreRow: React.FC<Props> = ({ data }) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [favouriteId, setFavouriteId] = useState<string | null>("");

  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.id);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

  useEffect(() => {
    loggedIn && fetchUsersSavedBean();
  }, [data]);

  const RowClickHandler = () => {
    navigate(`/coffee/${data._id}`);
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: COLORS.darkGreen,
    },
  });
  // console.log("data", data);

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
            bean: data.id,
            user: userId,
            favourite: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      // const data = await response.json();
      // console.log("Data from request:", data);
      setIsFavourite((prevCheck) => !prevCheck);
    } catch (err: any) {
      console.log("test err", err);
      if (err && !loggedIn) {
        // console.log("redirect to login");
        navigate(`/login`);
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
    } finally {
    }
  };

  const fetchUsersSavedBean = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/saved-beans/${data.id}/${userId}`,
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
      const resultData = await response.json();

      // console.log(
      //   "resultData",
      //   resultData.data && !!resultData?.data?.savedItem[0]?.favourite
      // );

      // resultData.data &&
      //   setIsFavourite(!!resultData?.data?.savedItem[0]?.favourite);

      resultData?.data && resultData?.data?.savedItem[0]?.favourite === true
        ? setIsFavourite(true)
        : setIsFavourite(false);

      if (resultData.data && resultData.data?.savedItem.length > 0) {
        setFavouriteId(resultData.data?.savedItem[0]?._id);
      }
    } catch (err: any) {
      console.log("err", err);
    } finally {
      // navigate(0);
    }
  };

  return (
    <div className="wrapper" onClick={() => RowClickHandler()}>
      <Box sx={{ flexGrow: 1 }} className="beanCard">
        <Grid container spacing={2}>
          <Grid item xs={5} sm={3} className="imageGrid">
            <img
              src={data?.image || catchBeanBag}
              className="d-inline-block align-top beanImage"
              alt={`Coffee bean pic, it this case is  ${data?.brand} ${data?.name}`}
              onError={addDefaultSrc}
              loading="lazy"
              title={`${data?.brand} ${data?.name}`}
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
                <div className="producer">by: {data?.brand}</div>
                <div className="ratingsAndNo">
                  <StyledRating
                    name="customized-color"
                    readOnly
                    value={data?.ratingsAverage}
                    precision={0.5}
                    icon={<LocalCafeIcon fontSize="inherit" />}
                    emptyIcon={<LocalCafeIcon fontSize="inherit" />}
                    sx={{ fontSize: 30 }}
                  />

                  <div className="reviewsNo">{data?.ratingsAverage} </div>
                </div>
                {data?.origin && (
                  // ORIGIN
                  <div className="origin">
                    <div className="origin-name">{data?.origin}</div>

                    {findFlagUrlByCountryName(data?.origin) && (
                      <img
                        src={findFlagUrlByCountryName(data?.origin)}
                        style={{
                          width: "37px",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        className="origin-flag"
                        alt={`Is representative for ${data?.name}`}
                        title={`Image representative for ${data?.name}`}
                      />
                    )}
                  </div>
                )}
                <div className="flavs">
                  {data?.type && (
                    // TYPE - ARABICA /ROBUSTA
                    <div className="info">
                      <Chip
                        color="success"
                        variant="outlined"
                        label={`${data?.type}`}
                        className="chip-element"
                      />
                    </div>
                  )}
                  {data?.roastLevel && (
                    // ROAST
                    <div className="info">
                      <Chip
                        // color="warning"
                        variant="outlined"
                        label={`${data?.roastLevel} roast`}
                        className="chip-element"
                      />
                    </div>
                  )}
                  {/* {data &&
                    data?.flavorNotes.map((el) => (
                      <div className="info">
                        <Chip
                          color="success"
                          variant="outlined"
                          label={el}
                          className="chip-element"
                        />
                      </div>
                    ))} */}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={5} sm={1}></Grid>
          <Grid
            item
            xs={7}
            sm={2}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              aria-label="fingerprint"
              color="success"
              style={{ display: "flex", alignItems: "flex-end" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Stop event propagation
                if (favouriteId) {
                  // console.log("data is saved so we will have to update it");
                  updateSaveBeanStaus();
                } else if (!favouriteId) {
                  // console.log("there is no data so we will create it");
                  createSaveBeanStatus();
                }
              }}
            >
              {isFavourite ? (
                <FavoriteIcon fontSize="large" />
              ) : (
                <FavoriteBorderIcon fontSize="large" />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ExploreRow;
