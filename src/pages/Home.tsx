import React, { Suspense } from "react";
import TopItems from "../components/TopItems";
import "./Home.scss";
import BeanSelector from "../components/BeanSelector";
import BestBeans2023 from "../components/BestBeans2023";
import YouMightLike from "../components/YouMightLike";
import Discover from "../components/Discover";
import { Helmet } from "react-helmet-async";
import CoffeeAnimation from "../components/textAnimation/CoffeeAnimation";
import FirstSection from "../components/heroSection/FirstSection";
import LocationSection from "../components/heroSection/LocationSection";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Helmet>
        <title>Baristretto: Coffee reviews and informations</title>
        <meta
          name="description"
          content="Discover the art of coffee at Baristretto. Explore expert reviews, learn about different brews, and find top coffee spots near you on our interactive maps. Start your coffee journey today"
        />
        <link rel="canonical" href={`/`} />
      </Helmet>
      <section>
        {/* {<CoffeeAnimation />} */}
        <FirstSection />
        <TopItems />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <LocationSection />
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
      </Suspense>
    </div>
  );
};

export default Home;
