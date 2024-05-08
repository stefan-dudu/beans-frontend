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
import { Helmet } from "react-helmet-async";

type Props = {};

const Home = (props: Props) => {
  // console.log("process.env.", process.env.REACT_APP_NAME);
  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  return (
    <div>
      <Helmet>
        <title>
          Baristretto: Reviews and informations about your current and next
          coffee
        </title>
        <meta
          name="description"
          content="Find out more about a specific coffee, such as its origin, the region, and the farm it's from. Leave reviews and contribute to the coffee community."
        />
        <link rel="canonical" href={`/`} />
      </Helmet>
      <CoffeeAnimation />
      <section>
        <TopItems />
      </section>
      <section>
        <BeanSelector />
      </section>
      <section>
        <YouMightLike />
      </section>
      <section>
        <Discover />
      </section>
      <section>
        <BestBeans2023 />
      </section>
      <div className="articles">
        <h2>Future article</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>
      <div className="articles">
        <h2>Future article</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>
    </div>
  );
};

export default Home;
