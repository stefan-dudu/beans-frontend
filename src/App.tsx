import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { AppDispatch, RootState } from "./store/store";
import { decrement, incrementByValue } from "./store/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  function Layout() {
    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/profile">User profile</Link>
            </li>
          </ul>
        </nav>

        <hr />

        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Outlet />
      </div>
    );
  }

  const Home = () => {
    return (
      <div>
        <h2>Count3: {count}</h2>
        <div>
          <button onClick={() => dispatch(decrement())}>Decrement -</button>
          <button onClick={() => dispatch(incrementByValue(10))}>
            Increment +
          </button>
        </div>
      </div>
    );
  };
  const LiveMatchDetails = () => {
    return <h2>LiveMatchDetails</h2>;
  };
  const Search = () => {
    return <h2>Search</h2>;
  };
  const Stats = () => {
    return <h2>Stats</h2>;
  };
  const UserProfile = () => {
    return <h2>UserProfile</h2>;
  };
  const CatchPage = () => {
    return <h2>CatchPage</h2>;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/livematch/:id" element={<LiveMatchDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<CatchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
