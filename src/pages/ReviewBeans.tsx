import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreRow from "../components/ExploreRow";
import { CoffeeType } from "../types/Coffee";

type Props = {};

const ReviewBeans = (props: Props) => {
  const [data, setData] = useState<CoffeeType[] | null>(null);

  useEffect(() => {}, []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInReviewBeans = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}api/v1/beans/?inReview=true`,
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
        // console.log("in review data", data.data);
        setData(data.data);
      } catch (err: any) {
        // setData(null);
      } finally {
      }
    };

    fetchInReviewBeans();
  }, []);

  const ApproveBean = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            inReview: false,
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      // console.log("id", id);
      // console.log("after post", data);
      if (data.status === "success") {
        // TODO: to refresh
        // console.log("all good");
        // refresh
        navigate(0);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  };

  // console.log("data", data);

  return (
    <div>
      <h3>ReviewBeans</h3>{" "}
      {data &&
        data.map((el) => {
          return (
            <div key={el._id}>
              <ExploreRow data={el} />
              <button onClick={() => ApproveBean(el._id)}>Approve</button>
              <button>Decline</button>
            </div>
          );
        })}
    </div>
  );
};

export default ReviewBeans;
