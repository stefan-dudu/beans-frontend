import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import catchBeanBag from "../assets/catchBeanBag.jpg";
import AddPinpoint from "../components/map/AddPinpoint";
import "./UserCreatesBean.scss";
import S3 from "aws-sdk/clients/s3";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [pictureURL, setPictureURL] = useState("");
  const [coord, setCoord] = useState<Coordinates>({ lng: 0, lat: 0 });

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const S3_BUCKET_URL = process.env.REACT_APP_BUCKET_URL;
  const S3_BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_REGION;
  const AccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const SecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
          image: pictureURL,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
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
      console.log(error);
    }
  };

  const submitHandler = async () => {
    if (name === "" || brand === "" || origin === "") {
      setOpen(true);
      setSeverity("error");
      setAlertMessage("Please add data to the required fields");
    } else {
      await uploadFile();
      await CreateBeanCall();
    }
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

  const coffeeTypes = [
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

  const allowedTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/svg",
    "image/heic",
    "image/heif",
  ];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("Only images are allowed.");
    }
  };
  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);

    const fileExtension = file.name.split(".").pop();

    const updatedFileName = `https://baristretto-bucket.s3.eu-central-1.amazonaws.com/beans/${brand
      .toLowerCase()
      .replace(/\s+/g, "-")}-${name
      .toLowerCase()
      .replace(/\s+/g, "-")}.${fileExtension}`;

    setPictureURL(updatedFileName);

    const objectKey = `${brand.toLowerCase().replace(/\s+/g, "-")}-${name
      .toLowerCase()
      .replace(/\s+/g, "-")}.${fileExtension}`;

    const s3 = new S3({
      params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
      region: process.env.REACT_APP_REGION,
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretAccessKey,
    });

    const params: S3.PutObjectRequest = {
      Bucket: process.env.REACT_APP_BUCKET_NAME!,
      Key: objectKey,
      Body: file,
      ContentType: `image/${fileExtension}`,
    };

    try {
      const upload = await s3.putObject(params).promise();
      console.log("updatedFileName", updatedFileName);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert(
        "Error uploading file: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} className="imageBookmarkRating">
          <div className="item">
            {
              <img
                src={
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : catchBeanBag
                }
                width="200"
                height="200"
                className="d-inline-block align-top"
                alt="The coffee bean uploaded by the user"
                onError={addDefaultSrc}
              />
            }
          </div>
          {/* <input type="file" required onChange={handleFileChange} /> */}

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            color="success"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload picture
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => handleFileChange(event)}
            />
          </Button>
          <Button
            variant="contained"
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

            <div style={{ display: "flex" }} className="ratingWrapper"></div>

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
                      {coffeeTypes.map((option) => (
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
