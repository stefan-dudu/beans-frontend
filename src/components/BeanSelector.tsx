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

// Define types
type Props = {};

const BeanSelector = (props: Props) => {
  // State variables
  const [roastLevel, setRoastLevel] = useState("");
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
    { value: 50, label: "Medium" },
    // { value: 66, label: "Medium-Dark" },
    { value: 100, label: "Dark" },
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const data = await response.json();
      console.log("Data from request:", data);
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
      case 50:
        setRoastLevel("Medium");
        break;
      // case 66:
      //   setRoastLevel("Medium-Dark");
      //   break;
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

  return (
    // Have a shodown this card for selector
    <div className="beanSelectorWrapper">
      <h2 style={{ color: "#006241" }}>
        Roast finder: Discover your ideal blend
      </h2>
      <Box className="box">
        {/* Slider for selecting roast level */}
        <div className="roastLevel">
          <h2>Roast level</h2>
          <Slider
            aria-label="Roast Level"
            defaultValue={50}
            getAriaValueText={(value: number) => `${value}°C`}
            step={null}
            marks={marks}
            onChange={handleSliderChange}
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
                    color: COLORS.darkGreen,
                    "&.Mui-checked": {
                      color: COLORS.darkGreen,
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
                    color: COLORS.darkGreen,
                    "&.Mui-checked": {
                      color: COLORS.darkGreen,
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
                    color: COLORS.darkGreen,
                    "&.Mui-checked": {
                      color: COLORS.darkGreen,
                    },
                  }}
                />
              }
              label="Blend"
            />
          </FormGroup>
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
