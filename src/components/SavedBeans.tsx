import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavouriteBeanListType } from "../types/FavouriteBeans";
import ExploreRow from "./ExploreRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import Skeleton from "@mui/material/Skeleton";

type Props = {};

const SavedBeans = (props: Props) => {
  const [favouriteBeans, setFavouriteBeans] = useState<
    FavouriteBeanListType[] | null
  >(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const fetchUsersFavouriteBeans = async () => {
    try {
      dispatch(isLoading());
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/users/saved-beans`,
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
      // console.log("this users saved beans", data.savedBeans.favourite);
      data.savedBeans.length > 0 && setFavouriteBeans(data.savedBeans);
      //   setError(null);
    } catch (err: any) {
      //   setData(null);
      //   setError(err);
      if (err && !loggedIn) {
        // console.log("redirect to login");
        navigate(`/login`, { replace: true });
      }
    } finally {
      dispatch(notLoading());
    }
  };

  useEffect(() => {
    !loggedIn && navigate(`/login`, { replace: true });
    loggedIn && fetchUsersFavouriteBeans();
  }, []);
  // console.log("favouriteBeans", favouriteBeans);

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
    <div>
      {favouriteBeans
        ? "Your favourite coffee: "
        : "Save coffee and you will find it here for later"}

      {loadingData && <SkeletonComponent />}

      {favouriteBeans &&
        favouriteBeans
          .filter((el) => el.favourite === true)
          .map((el: any) => {
            return (
              <div key={el._id}>
                {/* TODO: to create a custom one for saved beans as it uses the explore row*/}
                <ExploreRow data={el.bean} />
              </div>
            );
          })}
    </div>
  );
};

export default SavedBeans;
