import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import "./TopItems.scss";
import Skeleton from "@mui/material/Skeleton";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { COLORS } from ".././values/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import BeanCard from "./BeanCard";

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

const TopItems = (props: any) => {
  const [data, setData] = useState<Coffee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}api/v1/beans`,
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
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
        dispatch(notLoading());
      }
    };
    dispatch(isLoading());
    fetchDataForPosts();
  }, []);


  const SkeletonComponent = () => {
    const skeletons = [];

    for (let i = 0; i < 10; i++) {
      skeletons.push(
        <div key={i} className="skeletonItem">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={200}
            height={200}
          />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      );
    }

    return <>{skeletons}</>;
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      // color: "#ff6d75",
      color: COLORS.darkGreen,
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <div>
      <h2 style={{ padding: "1rem 0rem", color: "#1F3933" }}>
        Trending right now ...
      </h2>
      <div className="topBeansContainer">
        {loadingData && <SkeletonComponent />}
        {data && data?.map((el) => <BeanCard key={el.id} data={el} />)}
      </div>
    </div>
  );
};

export default TopItems;
