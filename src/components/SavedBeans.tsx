import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavouriteBeanListType } from "../types/FavouriteBeans";
import ExploreRow from "./ExploreRow";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {};

const SavedBeans = (props: Props) => {
  const [favouriteBeans, setFavouriteBeans] = useState<
    FavouriteBeanListType[] | null
  >(null);

  const navigate = useNavigate();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const fetchUsersFavouriteBeans = async () => {
    try {
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
      //   setLoading(false);
    }
  };

  useEffect(() => {
    !loggedIn && navigate(`/login`, { replace: true });
    loggedIn && fetchUsersFavouriteBeans();
  }, []);
  // console.log("favouriteBeans", typeof favouriteBeans);

  return (
    <div>
      Your favourite coffee:
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
