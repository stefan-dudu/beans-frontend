import React from "react";
import TopItems from "../components/TopItems";
import "./Home.scss";
import DynamicSearchBar from "../components/searchBar/DynamicSearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BeanSelector from "../components/BeanSelector";
import BestBeans2023 from "../components/BestBeans2023";
import YouMightLike from "../components/YouMightLike";
import Discover from "../components/Discover";
import CoffeeAnimation from "../components/CoffeeAnimation";

type Props = {};

const Home = (props: Props) => {
  // console.log("process.env.", process.env.REACT_APP_NAME);
  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  console.log("loadingData", loadingData);
  return (
    <div>
      <CoffeeAnimation />
      <TopItems />
      <BeanSelector />
      <YouMightLike />
      <Discover />
      <BestBeans2023 />
      <div className="articles">
        <h2>Future article</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>{" "}
      <div className="articles">
        <h2>Future article</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>{" "}
    </div>
  );
};

export default Home;
