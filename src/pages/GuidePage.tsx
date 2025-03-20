import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import { AppDispatch, RootState } from "../store/store";
import { GuideType } from "../types/Guide";
import Skeleton from "@mui/material/Skeleton";

import "./GuidePage.scss";

type Props = {};

const GuidePage = (props: Props) => {
  let { slug } = useParams();
  const [guides, setGuides] = useState<GuideType>();

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const fetchCurrentGuide = async () => {
    try {
      dispatch(isLoading());
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/guides/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // TODO: ESSENTIAL FOR jwt
          // credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      // console.log(data);
      setGuides(data);
      // console.log("this users saved beans", data.savedBeans.favourite);
      // data.savedBeans.length > 0 && setFavouriteBeans(data.savedBeans);
      //   setError(null);
    } catch (err: any) {
      // if (err && !loggedIn) {
      //   navigate(`/login`, { replace: true });
      // }
    } finally {
      dispatch(notLoading());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(isLoading());
    fetchCurrentGuide();
  }, []);

  const SkeletonComponent = () => {
    const skeletons = [];

    skeletons.push(
      <div className="skeletonItemGuide">
        <Skeleton animation="wave" variant="text" width={"30%"} />

        <Skeleton
          animation="wave"
          variant="rounded"
          width={200}
          height={"20rem"}
        />
        <Skeleton animation="wave" variant="text" width={"90%"} />
        <Skeleton animation="wave" variant="text" width={"80vw"} />
        <Skeleton animation="wave" variant="text" width={"80vw"} />
        <Skeleton animation="wave" variant="text" width={"80vw"} />
        <Skeleton animation="wave" variant="text" width={"80vw"} />
        <Skeleton animation="wave" variant="text" width={"80vw"} />
      </div>
    );

    return <>{skeletons}</>;
  };

  return (
    <div className="guidesPageWrapper">
      {loadingData && <SkeletonComponent />}
      {guides && (
        <>
          <div className="guidesPageTitle">{guides?.title}</div>
          <img
            src={guides?.imageLink}
            style={{ width: "20rem", height: "auto", objectFit: "contain" }}
            className="article-image"
            alt={`Is representative for ${guides?.title}`}
            title={`Image representative for ${guides?.title}`}
          />
          <div className="guidesPageContent">
            <Markdown>{guides?.content}</Markdown>
          </div>
        </>
      )}
    </div>
  );
};

export default GuidePage;
