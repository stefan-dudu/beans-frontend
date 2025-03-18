import { useSelector } from "react-redux";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { RootState } from "./store/store";
import UserProfile from "./pages/Auth&User/UserProfile";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
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
import CoffeeFarms from "./pages/CoffeeFarms";
import SavedBeans from "./pages/SavedBeans";
import Footer from "./pages/Footer";
import Contact from "./pages/Footer/Contact";
import AboutUs from "./pages/Footer/AboutUs";
import NextFeatures from "./pages/Footer/NextFeatures";
import CatchPage from "./pages/CatchPage";
import CountryPage from "./pages/CountryPage";
import Guides from "./pages/Guides";
import GuidePage from "./pages/GuidePage";

function App() {
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const Pricing = () => {
    return <h2>Pricing</h2>;
  };

  return (
    <div className="App-header">
      <header>
        <nav>
          <NavigationBar />
          {loadingData && <LinearProgress color="success" />}
        </nav>
      </header>
      <main>
        <div className="content">
          <Routes>
            <Route path="/" element={<Outlet />}>
              {/* TODO: to checkout what routes need to be protected */}
              <Route element={<PrivateRoutes />}>
                {/* Restritcted to ADMINS */}
                <Route path="/reviewBeans" element={<ReviewBeans />} />
              </Route>
              <Route index element={<Home />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guide/:slug" element={<GuidePage />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/favourites" element={<SavedBeans />} />
              <Route path="/farms/:name" element={<CoffeeFarms />} />
              <Route path="/country/:isoCode" element={<CountryPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/createbean" element={<UserCreatesBean />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/coffee/:id" element={<DetailedCoffeeBeans />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/next-features" element={<NextFeatures />} />
              <Route path="*" element={<CatchPage />} />
            </Route>
          </Routes>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
