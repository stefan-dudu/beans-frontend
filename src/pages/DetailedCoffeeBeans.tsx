import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RateBean from "../components/RateBean";
import DetailedBeanMap from "../components/DetailedBeanMap";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import catchBeanBag from "../assets/catchBeanBag.jpg";

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
        {/* <Skeleton animation="wave" variant="text" width={200} />

        <Skeleton animation="wave" variant="text" width={200} />
        <Skeleton animation="wave" variant="text" width={200} />
        <Skeleton animation="wave" variant="text" width={200} />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"100vw"}
          height={200}
        /> */}

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* left component */}
            <Grid item xs={9} sm={4}>
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
            <Grid item xs={3} sm={8}>
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

  console.log("data", data);

  return (
    <div>
      {loadingData ? (
        // {true ? (
        <SkeletonComponent />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
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
              <p>Bookmark this coffe bean</p>
              <RateBean maxStars={5} currentRating={data?.ratingsAverage} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <h1>{data?.name || "name"}</h1>
              <h3>{data?.brand || "brand"}</h3>
              <div style={{ display: "flex" }}>
                {/* <p>Ratings in stars here pretty big</p> */}
                <RateBean maxStars={5} currentRating={data?.ratingsAverage} />
                {/* <p>No of ratings: {data?.ratingsQuantity}</p> */}
              </div>
              <p>Origin: {data?.origin}</p>
              {/* flag maybe? */}

              <p>Altitude: 2821m </p>
              <div>
                <p>Body: - - - - - </p>
                <p>Acidity: - - - - - </p>
                <p>Other: - - - - - </p>
              </div>
              <p>Flavour notes: CHOCOLTAE , NUTTY, SPICY </p>
              {data?.locations && (
                <DetailedBeanMap location={data?.locations} />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default DetailedCoffeeBeans;
