import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreRow.scss";
import catchBeanBag from "../assets/catchBeanBag.jpg";
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

type Props = {
  data: CoffeeType;
};

const ExploreRow: React.FC<Props> = ({ data }) => {
  const [isFavourite, setIsFavourite] = React.useState<boolean>(false);
  const [favouriteId, setFavouriteId] = React.useState<string | null>("");

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
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
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
                <div className="producer">by: {data?.brand}</div>
                <div className="info">{data?.type}</div>
                <div className="info">{data?.roastLevel} roast</div>
              </div>
              {/* <div className="flavs">
                {data && data?.flavorNotes.map((el) => <div>{el}</div>)}
              </div> */}
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
                {/* <div className="rating">4.3</div> */}

                <StyledRating
                  name="customized-color"
                  readOnly
                  value={data?.ratingsAverage}
                  precision={0.5}
                  icon={<LocalCafeIcon fontSize="inherit" />}
                  emptyIcon={<LocalCafeIcon fontSize="inherit" />}
                />

                <div className="reviewsNo">{data?.ratingsQuantity} </div>
              </div>
            </div>
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
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ExploreRow;
