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

type Coffee = {
  _id: string;
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

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

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
  console.log("data", data && data[0]);

  const BeanCard = ({ data }: { data: Coffee }) => {
    // console.log("data", data);
    return (
      <Link to={`/coffee/${data._id}`} key={data._id} className="parentWrapper">
        <img
          className="image"
          src={data?.image || catchBeanBag}
          alt="React Bootstrap logo"
          onError={addDefaultSrc}
        />
        <div className="underPic">
          <div className="title">{data?.name}</div>
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
          <div className="origin"> {data?.origin}</div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <h2 style={{ padding: "1rem 0rem" }}>Trending right now ...</h2>
      <div className="topBeansContainer">
        {loadingData && <SkeletonComponent />}
        {data && data?.map((el) => <BeanCard data={el} />)}
      </div>
    </div>
  );
};

export default TopItems;
