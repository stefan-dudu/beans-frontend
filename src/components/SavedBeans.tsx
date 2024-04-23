import React, { useEffect, useState } from "react";
import { FavouriteBeanListType } from "../types/FavouriteBeans";
import ExploreRow from "./ExploreRow";

type Props = {};

const SavedBeans = (props: Props) => {
  const [favouriteBeans, setFavouriteBeans] = useState<
    FavouriteBeanListType[] | null
  >(null);

  const fetchUsersSavedBeans = async () => {
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
      // console.log("this users saved beans", data.savedBeans);
      data.savedBeans.length > 0 && setFavouriteBeans(data.savedBeans);
      //   setError(null);
    } catch (err: any) {
      //   setData(null);
      //   setError(err);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersSavedBeans();
  }, []);
  console.log("favouriteBeans", typeof favouriteBeans);

  return (
    <div>
      Explore your favourite saved coffee
      {favouriteBeans &&
        favouriteBeans.map((el: any) => {
          return (
            <div key={el._id}>
              <ExploreRow data={el.bean} />
            </div>
          );
        })}
    </div>
  );
};

export default SavedBeans;
