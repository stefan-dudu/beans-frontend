import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppDispatch, RootState } from "./store/store";
import { decrement, incrementByValue } from "./store/counter/counterSlice";
import UserProfile from "./pages/Auth&User/UserProfile";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Locations from "./pages/Locations";
import DetailedCoffeeBeans from "./pages/DetailedCoffeeBeans";
import Login from "./pages/Auth&User/Login";
import Explore from "./pages/Explore";
import SignUp from "./pages/Auth&User/SignUp";
import Search from "./pages/Search";
import LinearProgress from "@mui/material/LinearProgress";
import ForgotPassword from "./pages/Auth&User/ForgotPassword";
import UserCreatesBean from "./pages/UserCreatesBean";
import ReviewBeans from "./pages/ReviewBeans";
import PrivateRoutes from "./utils/PrivateRoutes";
import Cafes from "./pages/Cafes";
import RoasteriesFarms from "./pages/RoasteriesFarms";
import SavedBeans from "./components/SavedBeans";
function App() {
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const Pricing = () => {
    return <h2>Pricing</h2>;
  };
  const CatchPage = () => {
    return <h2>CatchPage</h2>;
  };

  return (
    <div className="App-header">
      <NavigationBar />
      {loadingData && <LinearProgress color="success" />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Outlet />}>
            {/* TODO: to checkout what routes need to be protected */}
            <Route element={<PrivateRoutes />}>
              {/* Restritcted to ADMINS */}
              <Route path="/reviewBeans" element={<ReviewBeans />} />
            </Route>
            <Route index element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/favourites" element={<SavedBeans />} />
            <Route path="/roasteries" element={<RoasteriesFarms />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/createbean" element={<UserCreatesBean />} />
            {/* <Route path="/reviewBeans" element={<ReviewBeans />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/coffee/:id" element={<DetailedCoffeeBeans />} />
            <Route path="*" element={<CatchPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
