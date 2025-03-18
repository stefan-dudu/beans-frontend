import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Markdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import { AppDispatch } from "../store/store";
import { GuideType } from "../types/Guide";

import "./GuidePage.scss";

type Props = {};

const GuidePage = (props: Props) => {
  let { slug } = useParams();
  const [guides, setGuides] = useState<GuideType>();

  const dispatch = useDispatch<AppDispatch>();

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
    fetchCurrentGuide();
  }, []);

  return (
    <div className="guidesPageWrapper">
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
    </div>
  );
};

export default GuidePage;
