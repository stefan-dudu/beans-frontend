import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type Props = {};

const UserCreatesBean = (props: Props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const PostCall = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}api/v1/beans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          brand,
          origin,
          price,
        }),
      });
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("after post", data);
      if (data.status === "success") {
        // TODO: might have to do it
        // dispatch(login());
        // localStorage.setItem("token", data.token); // Store token in local storage
        //TODO: edit alert
        alert("posted");
        navigate("/");
      }
    } catch (error) {
      alert("error");
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  };

  const submitHandler = () => {
    PostCall();
  };

  return (
    <div>
      UserCreatesBean
      <div className="inputAndButton">
        <TextField
          sx={{ m: 1, width: "25ch" }}
          id="outlined-basic"
          variant="outlined"
          label="Name of coffee bean"
          color="success"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1, width: "25ch" }}
          color="success"
          id="outlined-basic"
          variant="outlined"
          label="Brand"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBrand(event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1, width: "25ch" }}
          color="success"
          id="outlined-password-input"
          label="Origin"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setOrigin(event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1, width: "25ch" }}
          color="success"
          id="outlined-password-input"
          label="Price"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPrice(parseFloat(event.target.value));
          }}
        />

        <Button
          color="success"
          variant="contained"
          onClick={() => {
            submitHandler();
          }}
        >
          Add a new bean
        </Button>
      </div>
    </div>
  );
};

export default UserCreatesBean;
