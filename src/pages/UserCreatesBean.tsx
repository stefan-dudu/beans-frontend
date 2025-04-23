import React, { useState, SyntheticEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import catchBeanBag from "../assets/catchBeanBag.webp";
import AddPinpoint from "../components/map/AddPinpoint";
import "./UserCreatesBean.scss";
import S3 from "aws-sdk/clients/s3";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import Rating from "@mui/material/Rating";
import { COLORS } from "../values/colors";
import Autocomplete from "@mui/material/Autocomplete";
import { isLoading, notLoading } from "../store/navBar/NavBarSlice";
import { RootState } from "../store/store";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AWS from "aws-sdk";
import { countries } from "../data/countries";
import { topFlavors } from "../data/coffeeFalvors";
import { coffeeProcessingMethods } from "../data/coffeeProcessingMethods";

type Props = {};

type Coordinates = [number, number][];

const initialCoordinates: Coordinates = [
  [-54.194742028056325, -4.601091829139477],
  [-59.042290785139386, -1.5163516718773309],
];

const UserCreatesBean = (props: Props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState<string[]>(["Brazil"]);
  const [type, setType] = useState("Arabica");
  const [roastLevel, setRoastLevel] = useState("Medium");
  const [processing, setProcessing] = useState<string | null>("Washed (Wet)");
  const [qGrading, setQgrading] = useState<number | "">("");
  const [altitude, setAltitude] = React.useState<number[]>([800, 1500]);
  const [body, setBody] = useState(0);
  const [acidity, setAcidity] = useState(0);
  const [sweetness, setSweetness] = useState(0);
  const [bitterness, setBitterness] = useState(0);
  const [flavor, setFlavor] = useState<string[]>([""]);
  const [file, setFile] = useState<File | null>(null);
  const [pictureURL, setPictureURL] = useState("");
  const [coord, setCoord] = useState<Coordinates>(initialCoordinates);
  const [checked, setChecked] = React.useState(false);
  const [farmData, setFarmData] = useState<string>("");

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const S3_BUCKET_URL = process.env.REACT_APP_BUCKET_URL as string;
  const S3_BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME as string;
  const REGION = process.env.REACT_APP_REGION as string;
  const AccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID as string;
  const SecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string;

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

  const marks = [
    { value: 0, label: "Light" },
    { value: 33, label: "Medium" },
    { value: 66, label: "Medium-Dark" },
    { value: 100, label: "Dark" },
  ];

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
          roastLevel,
          processing,
          qGrading,
          altitude: `${altitude[0]} - ${altitude[1]}`,
          bodyAverage: body,
          acidityAverage: acidity,
          sweetnessAverage: sweetness,
          bitternessAverage: bitterness,
          flavorNotes: flavor,
          locations: {
            coordinates: coord,
            // coordinates: [[1,2], [3,4]],
            description: farmData,
          },
          image: pictureURL,
        }),
      });
      // console.log("test data sent to BE", coord);
      const data = await response.json();
      if (data.status === "success") {
        setOpen(true);
        setSeverity("success");
        setAlertMessage("The new coffee bean has been sent to review");

        setTimeout(() => {
          !loadingData && navigate("/");
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

  async function getCoordinatesFromCountry(countryName: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(
        countryName
      )}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        country: countryName,
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    } else {
      return {
        country: countryName,
        lat: null,
        lng: null,
        error: "Country not found",
      };
    }
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    switch (value) {
      case 0:
        setRoastLevel("Light");
        break;
      case 33:
        setRoastLevel("Medium");
        break;
      case 66:
        setRoastLevel("Medium-Dark");
        break;
      case 100:
        setRoastLevel("Dark");
        break;
      default:
        setRoastLevel("Medium");
    }
  };

  const submitHandler = async () => {
    if (name === "" || brand === "") {
      setOpen(true);
      setSeverity("error");
      setAlertMessage("Please add data to brand and name fields");
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
    setCoord(data);
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

  const fileExtension = file && file.name.split(".").pop();

  const updatedFileName = `${S3_BUCKET_URL}beans/${brand
    .toLowerCase()
    .replace(/\s+/g, "-")}-${name
    .toLowerCase()
    .replace(/\s+/g, "-")}.${fileExtension}`;

  const uploadFile = async () => {
    if (!file) return;
    dispatch(isLoading());

    const fileExtension = file.name.split(".").pop();

    const updatedFileName = `${process.env.REACT_APP_BUCKET_URL}beans/${brand
      .toLowerCase()
      .replace(/\s+/g, "-")}-${name
      .toLowerCase()
      .replace(/\s+/g, "-")}.${fileExtension}`;

    setPictureURL(updatedFileName);

    const objectKey = `${brand.toLowerCase().replace(/\s+/g, "-")}-${name
      .toLowerCase()
      .replace(/\s+/g, "-")}.${fileExtension}`;

    const s3 = new S3({
      params: { Bucket: S3_BUCKET_NAME },
      region: REGION,
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretAccessKey,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const params: S3.PutObjectRequest = {
      Bucket: S3_BUCKET_NAME!,
      Key: objectKey,
      Body: file,
      ContentType: `image/${fileExtension}`,
    };

    try {
      await s3.upload(params).promise();
      dispatch(notLoading());
    } catch (error) {
      console.error(error);
      dispatch(notLoading());
      alert(
        "Error uploading file: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  // Add image for articles

  class MyUploadAdapter {
    loader: any;

    constructor(loader: any) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file: File) =>
          new Promise((resolve, reject) => {
            // Initialize AWS S3 upload logic here
            const S3_BUCKET = process.env
              .REACT_APP_BUCKET_NAME_ARTICLES as string;

            AWS.config.update({
              accessKeyId: AccessKeyId,
              secretAccessKey: SecretAccessKey,
              region: REGION,
            });

            const s3 = new AWS.S3({
              params: {
                Bucket: S3_BUCKET,
              },
            });

            const uploadParams = {
              Bucket: S3_BUCKET,
              Key: `${file.name}`,
              Body: file,
              ContentType: file.type,
            };

            s3.upload(
              uploadParams,
              (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    default: data.Location, // URL of the uploaded image
                  });
                }
              }
            );
          })
      );
    }

    abort() {
      // Handle aborting the upload process
    }
  }

  function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader);
    };
  }

  const AddFarmData = () => {
    return (
      <div style={{ width: "100%" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Check this to add informations about the coffee farm"
            checked={checked}
            onChange={(event, newValue) => {
              setChecked((prevCheck) => !prevCheck);
            }}
          />
        </FormGroup>
      </div>
    );
  };

  useEffect(() => {
    setPictureURL(updatedFileName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, name, brand, origin]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!origin || origin.length === 0) return;

      try {
        const results = await Promise.all(
          origin.map(async (country) => {
            const { lat, lng } = await getCoordinatesFromCountry(country);
            return [lng, lat] as [number, number];
          })
        );
        setCoord(results);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [origin]);

  const Traits = () => {
    const StyledRating = styled(Rating)({
      "& .MuiRating-iconFilled": {
        color: COLORS.darkGreen,
      },
    });

    return (
      <div className="traits">
        <div className="propWrapper">
          <div className="propName">Body: </div>
          <div className="propValue">
            <StyledRating
              name="simple-controlled"
              value={body}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                newValue && setBody(newValue);
              }}
            />
            {body}
          </div>
        </div>
        <div className="propWrapper">
          <div className="propName">Acidity: </div>

          <div className="propValue">
            <StyledRating
              name="simple-controlled"
              value={acidity}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                newValue && setAcidity(newValue);
              }}
            />
            {acidity}
          </div>
        </div>
        <div className="propWrapper">
          <div className="propName">Sweetness: </div>
          {/* TODO: alternative or another one INTENSITY */}
          <div className="propValue">
            <StyledRating
              name="simple-controlled"
              value={sweetness}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                newValue && setSweetness(newValue);
              }}
            />
            {sweetness}
          </div>
        </div>
        <div className="propWrapper">
          <div className="propName">Bitterness: </div>
          <div className="propValue">
            <StyledRating
              name="simple-controlled"
              value={bitterness}
              icon={<LocalCafeIcon fontSize="inherit" />}
              emptyIcon={<LocalCafeIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                newValue && setBitterness(newValue);
              }}
            />
            {bitterness}
          </div>
        </div>
      </div>
    );
  };

  const handleChangeAltitude = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setAltitude(newValue as [number, number]);
    }
  };

  const handleQGradingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    // Allow empty input
    if (inputValue === "") {
      setQgrading("");
      return;
    }

    // Allow only numbers with one decimal place
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      const clampedValue = Math.min(100, Math.max(0, parsedValue)); // Clamp 0-100
      setQgrading(Number(clampedValue.toFixed(1))); // Ensure one decimal place
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
                loading="lazy"
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
            Select picture
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
              <div className="brand">Brand</div>
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Name of the manufacturer"
                variant="standard"
                value={brand}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setBrand(event.target.value);
                }}
              />
            </div>

            <div className="titleTextFieldWrapper">
              <div className="brand">Variety: </div>
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Coffee's name"
                variant="standard"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
              />
            </div>

            <div className="titleTextFieldWrapper">
              <div className="brand">Origin: </div>
              <Autocomplete
                multiple
                sx={{ width: "100%" }}
                id="tags-standard"
                options={countries}
                defaultValue={[countries[0]]}
                onChange={(event, newValue) => setOrigin(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    placeholder="Country"
                  />
                )}
              />
            </div>

            <div style={{ display: "flex" }} className="ratingWrapper"></div>

            <Accordion style={{ width: "98%" }}>
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
                  <div className="roast-slider" style={{ width: "80%" }}>
                    <div className="subtitle">Altitude: </div>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={altitude}
                      onChange={handleChangeAltitude}
                      valueLabelDisplay="on"
                      min={0}
                      max={2500}
                      step={100}
                    />
                  </div>
                  <div className="roast-slider">
                    <div className="subtitle">Roast level: </div>
                    <Slider
                      className="slider"
                      sx={{ width: "215px" }}
                      aria-label="Roast Level"
                      defaultValue={33}
                      getAriaValueText={(value: number) => `${value}°C`}
                      step={null}
                      marks={marks}
                      onChange={handleSliderChange}
                    />
                  </div>
                  <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">Processing: </div>

                    <Autocomplete
                      options={coffeeProcessingMethods}
                      value={processing}
                      defaultValue={coffeeProcessingMethods[0]}
                      onChange={(_, newValue) => setProcessing(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ width: "40vw" }}
                    />
                  </div>
                  <div className="subtitleTextFieldWrapper">
                    <div className="subtitle">QGrading: </div>
                    <TextField
                      label="0 to 100"
                      type="number"
                      value={qGrading}
                      onChange={handleQGradingChange}
                      inputProps={{ step: "0.1", min: "0", max: "100" }} // Step of 0.1 for decimals
                      sx={{ width: "200px" }}
                      helperText={
                        qGrading !== "" && (qGrading < 0 || qGrading > 100)
                          ? "Must be between 0 and 100"
                          : ""
                      }
                      error={
                        qGrading !== "" && (qGrading < 0 || qGrading > 100)
                      }
                    />
                  </div>
                  <Traits />
                  <Autocomplete
                    multiple
                    fullWidth
                    id="tags-standard"
                    options={topFlavors}
                    defaultValue={[topFlavors[1]]}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => {
                      setFlavor(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Flavours"
                        placeholder="Add flavour notes"
                      />
                    )}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <AddFarmData />
          {checked && (
            <>
              <div className="editorWr" style={{ width: "100%" }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={farmData}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFarmData(data);
                  }}
                  config={{
                    placeholder:
                      "Tell us more about the origin of the coffee such as the region, coffee farm, farmer, etc.",
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                  }}
                />
              </div>
              <p>
                Add a pin with the location of the farm and tell us it's story
              </p>
              <AddPinpoint sendDataToParent={handleDataFromChild} />
            </>
          )}

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
