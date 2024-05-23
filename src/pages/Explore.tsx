import React, { useEffect, useState } from "react";
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

type Props = {};

const Explore: React.FC<Props> = (props) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);
  const [filter, setFilter] = useState("Ratings average");
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  // TODO: Paginating, to decrease loading time
  const fetchAllBeans = async () => {
    try {
      // TODO: will have to update this inReview fasle thing
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans?inReview=false`,
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
      setData(null);
    } finally {
      dispatch(notLoading());
    }
  };

  useEffect(() => {
    if (!state?.data) {
      // console.log("there is no data so i will show beans to explore");
      dispatch(isLoading());
      fetchAllBeans();
    } else if (state?.data) {
      // console.log("has data - it means it been redirected from a page ");
      setData(state?.data);
    }
  }, [state]);

  useEffect(() => {
    if (data) {
      // Create a copy of the data array to avoid mutating the state directly
      const sortedData = [...data];

      // Sort the data based on the selected filter in descending order
      sortedData.sort((a, b) => {
        if (filter === "ratingsQuantity") {
          return b.ratingsQuantity - a.ratingsQuantity; // Reverse order for descending
        } else if (filter === "ratingsAverage") {
          return b.ratingsAverage - a.ratingsAverage; // Reverse order for descending
        } else if (filter === "price") {
          return b.price - a.price; // Reverse order for descending
        } else if (filter === "acidity") {
          return b.acidity - a.acidity; // Reverse order for descending
        } else {
          // Default case, return 0 for no sorting
          return 0;
        }
      });

      // Update the sorted data in the state
      setData(sortedData);
    }
  }, [filter]);

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
            // width={200}
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
    <div className="explore-wrapper">
      <Helmet>
        <title>Baristretto: Explore a wide selection of coffee beans.</title>
        <meta
          name="description"
          content="Browse our curated selection of coffee beans from around the globe. Sort by region, farm, or flavor profile to find your perfect brew. Join our community and discover the world of exceptional coffee."
        />
        <link rel="canonical" href={`/explore`} />
      </Helmet>
      <div>
        {/* TODO: have a filtering way for results */}
        {/* <h4>Filter btn</h4> */}
        <div className="top-row">
          <TextField
            id="outlined-select-currency"
            className="sort-field"
            select
            label="Sort"
            defaultValue="ratingsAverage"
            helperText="Please select a value"
            // value={filter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilter(event.target.value);
            }}
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

        {data &&
          data.map((el) => {
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
