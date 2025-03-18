import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ExploreRow from "../components/ExploreRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { notLoading, isLoading } from "../store/navBar/NavBarSlice";
import { CoffeeType } from "../types/Coffee";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./Explore.scss";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet-async";
import useIntersectionObserver from "../utils/useIntersectionObserver";

type Props = {};

const Explore: React.FC<Props> = (props) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);
  const [sortedData, setSortedData] = useState<CoffeeType[] | null>(null);
  const [filter, setFilter] = useState("ratingsQuantity");
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef);
  const hasFetchedData = useRef<boolean>(false);

  const fetchAllBeans = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans?inReview=false`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      setData(data.data);
    } catch (err: any) {
      setData(null);
    } finally {
      dispatch(notLoading());
    }
  };

  useEffect(() => {
    if (isVisible && !hasFetchedData.current) {
      window.scrollTo(0, 0);
      if (!state?.data) {
        dispatch(isLoading());
        fetchAllBeans();
      } else if (state?.data) {
        setData(state?.data);
      }
      hasFetchedData.current = true;
    }
  }, [isVisible, state, dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      const sorted = [...data].sort((a, b) => {
        if (filter === "ratingsQuantity") {
          return b.ratingsQuantity - a.ratingsQuantity;
        } else if (filter === "ratingsAverage") {
          return b.ratingsAverage - a.ratingsAverage;
        } else if (filter === "price") {
          return b.price - a.price;
        } else if (filter === "acidity") {
          return b.acidityAverage - a.acidityAverage;
        } else {
          return 0;
        }
      });
      setSortedData(sorted);
    }
  }, [filter, data]);

  const filters = [
    {
      value: "ratingsQuantity",
      label: "Number of ratings",
    },
    {
      value: "ratingsAverage",
      label: "Ratings average",
    },
    {
      value: "price",
      label: "Price",
    },
    {
      value: "acidity",
      label: "Acidity",
    },
  ];

  const SkeletonComponent = () => {
    const skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(
        <div key={i} className="skeletonItem">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={"100%"}
            height={200}
            className="skeleton-component"
          />
          <Skeleton animation="wave" variant="text" width={"100%"} />
        </div>
      );
    }
    return <>{skeletons}</>;
  };

  return (
    <div className="explore-wrapper" ref={containerRef}>
      <Helmet>
        <title>Baristretto: Explore a wide selection of coffee beans.</title>
        <meta
          name="description"
          content="Browse our curated selection of coffee beans from around the globe. Sort by region, farm, or flavor profile to find your perfect brew. Join our community and discover the world of exceptional coffee."
        />
        <link rel="canonical" href={`/explore`} />
      </Helmet>
      <div>
        <div className="top-row">
          <TextField
            id="outlined-select-currency"
            className="sort-field"
            select
            // label="Sort"
            defaultValue="ratingsQuantity"
            // helperText="Please select a value"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilter(event.target.value);
            }}
            // sx={{ background: "red" }}
          >
            {filters.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            color="success"
            sx={{ height: "55px" }}
            onClick={() => {
              if (signedIn) {
                navigate(`/createbean`);
              } else if (!signedIn) {
                navigate(`/login`, { replace: true });
              }
            }}
          >
            Add coffee
          </Button>
        </div>
        {loadingData && <SkeletonComponent />}
        {sortedData &&
          sortedData.map((el) => {
            return (
              <div key={el._id}>
                <ExploreRow data={el} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Explore;
