import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./BeanSelector.scss";
import { COLORS } from "../values/colors";
import { CoffeeType } from "../types/Coffee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { notLoading, isLoading } from "../store/navBar/NavBarSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

// Define types
type Props = {};

const BeanSelector = (props: Props) => {
  // State variables
  const [roastLevel, setRoastLevel] = useState("Medium");
  const [flavorNotes, setFlavorNotes] = useState<string[]>([]);
  const [data, setData] = useState<CoffeeType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  // Navigation hook
  const navigate = useNavigate();

  // Marks for the slider
  const marks = [
    { value: 0, label: "Light" },
    { value: 33, label: "Medium" },
    { value: 66, label: "Medium-Dark" },
    { value: 100, label: "Dark" },
  ];

  const falvorOptions = [
    "Earthy",
    "Rich",
    "Winey",
    "Smoky",
    "Caramel",
    "Fruity",
    "Herbal",
    "Citrus",
    "Berry",
    "Floral",
    "Bold",
    "Chocolate",
    "Spicy",
    "Delicate",
    "Nutty",
    "Cocoa",
  ];

  // Function to fetch bean data
  const fetchBeansData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/bean-selector`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            roastLevel,
            type: checkedItems,
            flavorNotes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      // console.log("Data from request:", data);
      if (data.results > 0) {
        navigate("/explore", { state: data.data });
      }

      if (data.results === 0) {
        setOpen(true);
        setSeverity("warning");
        setAlertMessage(
          "No bean with this specifications found. Try another one!"
        );
      }
      setData(data.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setData(null);
      setError(err);
    } finally {
      setLoading(false);
      dispatch(notLoading());
    }
  };

  // Function to handle slider value change
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // console.log("roastLevel", roastLevel);
  // console.log("checkedItems", checkedItems);

  // Function to handle checkbox change
  const handleCheckboxChange = (label: string) => {
    const isChecked = checkedItems.includes(label);
    const newCheckedItems = isChecked
      ? checkedItems.filter((item) => item !== label)
      : [...checkedItems, label];
    setCheckedItems(newCheckedItems);
  };

  // Function to handle 'Find your bean' button click
  const handleFindButtonClick = () => {
    dispatch(isLoading());
    fetchBeansData();
  };

  const getRoastLevelColor = (roastLevel: string) => {
    switch (roastLevel) {
      case "Light":
        return "#D7B29E"; // Light brown for light roast
      case "Medium":
        return "#8B5C42"; // Medium brown for medium roast
      case "Medium-Dark":
        return "#6F3D2E"; // Medium dark brown for medium dark roast
      case "Dark":
        return "#3E2B1C"; // Dark brown for dark roast
      default:
        return "#B4A89B"; // Default color if roastLevel is undefined
    }
  };

  const getBoxShadowColor = (roastLevel: string) => {
    switch (roastLevel) {
      case "Light":
        return "rgba(194, 140, 94, 0.6)"; // Light roast brown
      case "Medium":
        return "rgba(135, 90, 50, 0.6)"; // Medium roast brown
      case "Medium-Dark":
        return "rgba(102, 57, 25, 0.6)"; // Medium-Dark roast brown
      case "Dark":
        return "rgba(57, 28, 10, 0.6)"; // Dark roast brown
      default:
        return "rgba(92, 92, 92, 0.6)"; // Default gray (fallback)
    }
  };

  const boxShadow = getBoxShadowColor(roastLevel);

  return (
    // Have a shodown this card for selector
    <div
      className="beanSelectorWrapper"
      style={{
        boxShadow: `10px 20px 55px 0 ${boxShadow}`,
      }}
    >
      <div
        className="selector-title"
        style={{ color: getRoastLevelColor(roastLevel) }}
      >
        Roast finder: Discover your ideal blend
      </div>
      <Box className="box">
        {/* Slider for selecting roast level */}
        <div className="roastLevel">
          <h2>Roast level</h2>
          <Slider
            aria-label="Roast Level"
            defaultValue={33}
            getAriaValueText={(value: number) => `${value}°C`}
            step={null}
            marks={marks}
            onChange={handleSliderChange}
            sx={{
              "& .MuiSlider-thumb": {
                backgroundColor: getRoastLevelColor(roastLevel), // Thumb color based on roast level
                border: `2px solid ${getRoastLevelColor(roastLevel)}`, // Adding border to the thumb
              },
              "& .MuiSlider-rail": {
                backgroundColor: getRoastLevelColor(roastLevel), // Rail color based on roast level
                opacity: 0.3, // Make the rail a bit lighter (optional)
              },
              "& .MuiSlider-track": {
                backgroundColor: getRoastLevelColor(roastLevel),
                border: `1px solid ${getRoastLevelColor(roastLevel)}`, // Track color based on roast level
              },
              "& .MuiSlider-mark": {
                backgroundColor: getRoastLevelColor(roastLevel), // Marks color based on roast level
                width: "6px",
                height: "6px",
                borderRadius: "3px",
              },
              "& .MuiSlider-markLabel": {
                color: getRoastLevelColor(roastLevel), // Mark labels color based on roast level
              },
            }}
          />
        </div>
        <div className="type">
          {/* Checkboxes for selecting brands */}
          <h2>Type</h2>
          <FormGroup className="typeOptions">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes("Arabica")}
                  onChange={() => handleCheckboxChange("Arabica")}
                  sx={{
                    color: getRoastLevelColor(roastLevel),
                    "&.Mui-checked": {
                      color: getRoastLevelColor(roastLevel),
                    },
                  }}
                />
              }
              label="Arabica"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes("Robusta")}
                  onChange={() => handleCheckboxChange("Robusta")}
                  sx={{
                    color: getRoastLevelColor(roastLevel),
                    "&.Mui-checked": {
                      color: getRoastLevelColor(roastLevel),
                    },
                  }}
                />
              }
              label="Robusta"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes("Blend")}
                  onChange={() => handleCheckboxChange("Blend")}
                  sx={{
                    color: getRoastLevelColor(roastLevel),
                    "&.Mui-checked": {
                      color: getRoastLevelColor(roastLevel),
                    },
                  }}
                />
              }
              label="Blend"
            />
          </FormGroup>
        </div>

        <div className="flavorNotes">
          <Stack>
            <Autocomplete
              multiple
              id="tags-standard"
              options={falvorOptions}
              onChange={(event, newValue) => setFlavorNotes(newValue)}
              defaultValue={[]}
              renderTags={(value: string[], getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ backgroundColor: "palegreen", color: "black" }} // Custom chip style
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Flavor Notes"
                  placeholder="Select flavors"
                  sx={{
                    "& label.Mui-focused": { color: COLORS.darkGreen },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: COLORS.darkGreen,
                    },
                  }}
                />
              )}
            />
          </Stack>
        </div>
        {/* Button to trigger bean search */}
        <div className="findButton">
          <Button
            variant="contained"
            className="button"
            onClick={handleFindButtonClick}
          >
            Show coffee beans
          </Button>
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
        </div>
      </Box>
    </div>
  );
};

export default BeanSelector;
