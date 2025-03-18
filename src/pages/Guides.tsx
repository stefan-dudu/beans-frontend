import { useState, useEffect } from "react";
import GuideCardComponent from "../components/GuideCardComponent";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Guides.scss";
import { GuideType } from "../types/Guide";

type Props = {};

const Guides = (props: Props) => {
  const [guides, setGuides] = useState<GuideType[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const fetchGuides = async () => {
    try {
      dispatch(isLoading());
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/guides`,
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
      data.data.length > 0 && setGuides(data.data);
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
    fetchGuides();
  }, []);

  return (
    <div className="guidesParent">
      <div className="guidesTitle">Tips, guides and helpful informations</div>
      <div className="guideCardCompWrapper">
        {guides.map((el) => (
          <GuideCardComponent page={el.slug} guide={el} />
        ))}
      </div>
    </div>
  );
};

export default Guides;
