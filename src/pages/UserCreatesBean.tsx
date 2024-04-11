import React, { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import AddPinpoint from "../components/map/AddPinpoint";
import "./UserCreatesBean.scss";

type Props = {};

interface Coordinates {
  lng: number;
  lat: number;
}

const UserCreatesBean = (props: Props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("Arabica");
  const [processing, setProcessing] = useState("");
  const [qGrading, setQgrading] = useState("");
  const [altitude, setAltitude] = useState(0);
  const [coord, setCoord] = useState<Coordinates>({ lng: 0, lat: 0 });

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CreateBeanCall = async () => {
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
          type,
          processing,
          qGrading,
          altitude,
          locations: { coordinates: [coord.lng, coord.lat] },
        }),
      });
      const data = await response.json();
      // enter you logic when the fetch is successful
      // console.log("after post", data);
      if (data.status === "success") {
        //TODO: ALERT NOT SHOWN
        // alert("now is in review");
        setOpen(true);
        setSeverity("success");
        setAlertMessage("The new coffee bean has been sent to review");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

      if (data.status === "error") {
        setOpen(true);
        setSeverity("error");
        setAlertMessage(
          `There was an issue adding this bean. Error: ${data?.message}`
        );
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      // setOpen(true);
      // setSeverity("error");
      // setAlertMessage("There was an issue adding this bean.");

      console.log(error);
    }
  };

  const submitHandler = () => {
    CreateBeanCall();
    // console.log({
    //   name,
    //   brand,
    //   origin,
    //   type,
    //   processing,
    //   qgrading,
    //   altitude,
    //   locations: { coordinates: [coord.lng, coord.lat] },
    // });
    // setOpen(true);
    // setSeverity("success");
    // setAlertMessage("The new coffee bean has been sent to review");
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const currencies = [
    {
      value: "Arabica",
      label: "Arabica",
    },
    {
      value: "Robusta",
      label: "Robusta",
    },
    {
      value: "Blend",
      label: "Blend",
    },
  ];

  function handleDataFromChild(data: any) {
    setCoord({ lng: data.lng, lat: data.lat });
  }

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

  // console.log("dataFromChild", coord);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} className="imageBookmarkRating">
          <div className="item">
            {
              <img
                src={catchBeanBag}
                width="200"
                height="200"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                onError={addDefaultSrc}
              />
            }
          </div>
          <Button
            variant="outlined"
            color="success"
            onClick={() => submitHandler()}
          >
            Send for approval
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} className="restOfContent">
          <div className="aboveMapCreateBean">
            <div className="titleTextFieldWrapper">
              <div className="title">Name: </div>
              <TextField
                id="standard-basic"
                label="coffee's name"
                variant="standard"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
              />
            </div>

            <div className="titleTextFieldWrapper">
              <div className="brand">By: </div>
              <TextField
                id="standard-basic"
                label="name of the producer"
                variant="standard"
                value={brand}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setBrand(event.target.value);
                }}
              />
            </div>

            <div className="titleTextFieldWrapper">
              <div className="brand">Origin: </div>
              <TextField
                id="standard-basic"
                label="region, country"
                variant="standard"
                value={origin}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setOrigin(event.target.value);
                }}
              />
            </div>

            <div style={{ display: "flex" }} className="ratingWrapper">
              {/* <p>Ratings in stars here pretty big</p> */}
              {/* {data?.ratingsAverage && (
                <Rating
                  name="half-rating-read"
                  // defaultValue={2.5}
                  precision={0.5}
                  value={data?.ratingsAverage}
                  size="large"
                  readOnly
                />
              )} */}
              {/* {data?.ratingsAverage} */}
              {/* <p>No of ratings: {data?.ratingsQuantity}</p> */}
            </div>

            <Accordion style={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div className="dropdownTitle">
                  Add advanced characteristics
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <p style={{ color: "darkgrey" }}>
                  All these fields are optional
                </p>{" "}
                <div className="advancedWrapper">
                  <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">Type: </div>
                    <TextField
                      id="standard-select-currency-native"
                      select
                      SelectProps={{
                        native: true,
                      }}
                      helperText="Please select a type"
                      variant="standard"
                      defaultValue="Arabica"
                      value={type}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setType(event.target.value);
                      }}
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </div>
                  <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">Processing: </div>
                    <TextField
                      id="standard-basic"
                      // label="type of processing"
                      variant="standard"
                      value={processing}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setProcessing(event.target.value);
                      }}
                    />
                  </div>
                  <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">QGrading: </div>
                    <TextField
                      id="standard-basic"
                      label="points"
                      variant="standard"
                      // value={qgrading}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setQgrading(event.target.value);
                      }}
                    />
                  </div>
                  <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">Altitude: </div>
                    <TextField
                      id="standard-basic"
                      label="meters"
                      variant="standard"
                      // value={altitude}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setAltitude(parseFloat(event.target.value));
                      }}
                    />
                  </div>
                  {/* <Traits /> */}
                  {/* <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">Flavour notes: </div>
                    <TextField
                      id="standard-basic"
                      label="select flavs"
                      variant="standard"
                    />
                  </div> */}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <AddPinpoint sendDataToParent={handleDataFromChild} />
          <div className="snackbar">
            <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserCreatesBean;
