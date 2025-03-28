import { useState, useEffect } from "react";
import GuideCardComponent from "../components/GuideCardComponent";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Guides.scss";
import { GuideType } from "../types/Guide";
import Skeleton from "@mui/material/Skeleton";

type Props = {};

const Guides = (props: Props) => {
  const [guides, setGuides] = useState<GuideType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

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
      setLoading(false);
      dispatch(notLoading());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(isLoading());
    fetchGuides();
  }, []);

  const SkeletonComponent = () => {
    const skeletons = [];

    skeletons.push(
      <div className="skeletonItemGuideHome">
        <Skeleton
          animation="wave"
          variant="rounded"
          width={225}
          height={"12rem"}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={225}
          height={"12rem"}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={225}
          height={"12rem"}
        />
      </div>
    );

    return <>{skeletons}</>;
  };

  return (
    <div className="guidesParent">
      <div className="guidesTitle">Tips, guides and helpful informations</div>
      {loadingData || loading ? (
        <SkeletonComponent />
      ) : (
        guides && (
          <div className="guideCardCompWrapper">
            {guides.map((el) => (
              <GuideCardComponent page={el.slug} guide={el} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Guides;
