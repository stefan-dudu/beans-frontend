import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { AppDispatch } from "../../store/store";
import { LogoutFn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h3>email : {data && data?.email}</h3>
      <h3>name : {data && data?.name}</h3>
      <h3>role : {data && data?.role}</h3>
      <h3>id : {data && data?._id}</h3>
      <h2
        style={{ color: "red" }}
        onClick={() => {
          LogoutFn();
          navigate(`/`, { replace: true });
          dispatch(logout());
        }}
      >
        Log out
      </h2>
    </div>
  );
};

export default UserProfile;
