import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { AppDispatch } from "../../store/store";
import { LogoutFn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import userPic from "../../assets/user.png";
import Button from "@mui/material/Button";
import "./UserProfile.scss";

type User = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

const UserProfile: React.FC = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {}, []);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}api/v1/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            // TODO: ESSENTIAL FOR jwt
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const { data } = await response.json();
        setData(data.data);
        setError(null);
      } catch (err: any) {
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchInReviewBeans = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans?inReview=true`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // TODO: ESSENTIAL FOR jwt
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      // console.log("in review data", data.data);
      // setData(data.data);
      setError(null);
    } catch (err: any) {
      // setData(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <img
        src={userPic}
        width="40"
        height="40"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <div className="right-side">
        <div className="propWrapper">
          <div className="propName">Name</div>
          <div className="propValue">{data && data?.name}</div>
        </div>
        <div className="propWrapper">
          <div className="propName">Email</div>
          <div className="propValue">{data && data?.email}</div>
        </div>
        <div className="propWrapper">
          <div className="propName">Brewing method</div>
          <div className="propValue">AeroPress</div>
        </div>
        <div className="propWrapper">
          <div className="propName">Favourite origin</div>
          <div className="propValue">Ethiopian</div>
        </div>
        <div className="propWrapper">
          <div className="propName">Coffee grinder</div>
          <div className="propValue">Lelit PL71</div>
        </div>
        {/* <div>name : {data && data?.name}</div>
        <div>role : {data && data?.role}</div>
        <div>id : {data && data?._id}</div> */}
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

      {/* <SavedBeans /> */}
    </div>
  );
};

export default UserProfile;
