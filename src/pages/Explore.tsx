import React, { useEffect, useState, useMemo } from "react";
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

type Props = {};

const Explore: React.FC<Props> = (props) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
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
      setError(null);
    } catch (err: any) {
      setData(null);
      setError(err);
    } finally {
      dispatch(notLoading());
      setLoading(false);
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

  return (
    <div className="explore-wrapper">
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
                navigate(`/createbean`, { replace: true });
              } else if (!signedIn) {
                navigate(`/login`, { replace: true });
              }
            }}
          >
            Add coffee
          </Button>
        </div>

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
