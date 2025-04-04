import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { LogoutFn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import userPic from "../../assets/user.png";
import Button from "@mui/material/Button";
import "./UserProfile.scss";
import { Helmet } from "react-helmet-async";
import AbcIcon from "@mui/icons-material/Abc";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddTaskIcon from "@mui/icons-material/AddTask";

type User = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

const buttons = [
  { id: 1, label: "Overview", icon: <AbcIcon /> },
  { id: 2, label: "Reviews", icon: <AdUnitsIcon /> },
  { id: 3, label: "Equipment", icon: <AcUnitIcon /> },
  { id: 4, label: "Settings", icon: <AddTaskIcon /> },
];

const UserProfile: React.FC = () => {
  const [data, setData] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<number>(1); // Default to first button

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}api/v1/users/me`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const { data } = await response.json();
        setData(data.data);
      } catch (err: any) {
        if (err && !loggedIn) navigate(`/login`);
        setData(null);
      }
    };

    fetchUserData();
  }, []);

  console.log("data", data);

  return (
    <div className="profile-wrapper">
      <Helmet>
        <title>Baristretto: Your profile</title>
        <meta
          name="description"
          content="Here, you can save your favorite origin, brewing method, or current equipment, such as your coffee grinder or espresso machine."
        />
        <link rel="canonical" href={`/profile`} />
      </Helmet>

      <div className="profile-top-component">
        <img
          src={userPic}
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="User profile pic"
          loading="lazy"
          title="user profile picture"
        />
        <div>{data?.name}</div>
      </div>

      {/* Navigation buttons */}
      <div className="profile-middle-buttons-component">
        {buttons.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`nav-button ${activeSection === id ? "active" : ""}`}
            onClick={() => setActiveSection(id)}
          >
            <div className="icon-circle">{icon}</div>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content sections */}
      <div className="profile-bottom-component">
        {activeSection === 1 && <h2>Work in progress - Overview Content</h2>}
        {activeSection === 2 && <h2>Work in progress - Reviews Content</h2>}
        {activeSection === 3 && <h2>Work in progress - Equipment Content</h2>}
        {activeSection === 4 && <h2>Work in progress - Settings Content</h2>}
      </div>

      <div className="LATER-USE-DIV">
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            LogoutFn();
            navigate(`/`, { replace: true });
            dispatch(logout({ role: "none", id: "none" }));
          }}
        >
          Log out
        </Button>
        {data?.role === "admin" && (
          <button onClick={() => navigate(`/reviewBeans`, { replace: true })}>
            To review beans page
          </button>
        )}
      </div>
      <h2>
        If you found this page, it means you really like our website. Happy to
        see that. Currently we are working on implementing this feature ✌️
      </h2>
    </div>
  );
};

export default UserProfile;
