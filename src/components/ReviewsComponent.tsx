import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import { AppDispatch, RootState } from "../store/store";
import { ReviewType } from "../types/Review";
import ReviewCard from "./ReviewCard";

type Props = {};

const ReviewsComponent = (props: Props) => {
  const [data, setData] = useState<ReviewType[] | null>(null);
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const fetchReviewsForBean = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/${id}/reviews`,
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
      // console.log("reviews", data.data);
      setData(data.data);
    } catch (err: any) {
    } finally {
      dispatch(notLoading());
    }
  };

  useEffect(() => {
    // dispatch(isLoading());
    // fetchDataForPosts();
    fetchReviewsForBean();
  }, []);

  // console.log("data", data);

  return (
    <div style={{ width: "100%", padding: "1rem 0.3rem" }}>
      {data &&
        data
          ?.filter((el) => el.review)
          .map((el) => <ReviewCard key={el.id} data={el} />)}
    </div>
  );
};

export default ReviewsComponent;
