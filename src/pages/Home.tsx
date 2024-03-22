import React from "react";
import TopItems from "../components/TopItems";
import "./Home.scss";
import DynamicSearchBar from "../components/searchBar/DynamicSearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {};

const Home = (props: Props) => {
  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);
  return (
    <div>
      <h1>Is Signed In: {signedIn ? "yes" : "no"}</h1>
      <TopItems />
      <div className="articles">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit
          tincidunt aliquam. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae;
        </p>
      </div>
      <div className="articles">
        <h2>Title</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>
      <div className="articles">
        <h2>Title</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>{" "}
      <div className="articles">
        <h2>Title</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>{" "}
      <div className="articles">
        <h2>Title</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>{" "}
      <div className="articles">
        <h2>Title</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>{" "}
      <div className="articles">
        <h2>Title</h2>
        <p>
          Aenean tincidunt quis sem nec luctus. Donec non interdum eros.
          Phasellus facilisis facilisis eros, eu venenatis erat eleifend eget
        </p>
      </div>
    </div>
  );
};

export default Home;
