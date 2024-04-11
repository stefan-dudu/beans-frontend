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

// Define types
type Props = {};

type Coffee = {
  _id: string;
  name: string;
  origin: string;
  roastLevel: string;
  flavorNotes: string[];
  aroma: string;
  acidity: number;
  body: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  image: string;
  locations: {
    type: string;
    coordinates: number[];
    description: string;
    _id: string;
    id: string;
  }[];
  slug: string;
  id: string;
};

const BeanSelector = (props: Props) => {
  // State variables
  const [roastLevel, setRoastLevel] = useState("");
  const [data, setData] = useState<Coffee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Navigation hook
  const navigate = useNavigate();

  // Marks for the slider
  const marks = [
    { value: 0, label: "Light" },
    { value: 33, label: "Medium" },
    { value: 66, label: "Medium-Dark" },
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
      // console.log("Data from request:", data);
      if (data.results > 0) {
        navigate("/explore", { state: data.data });
      }
      setData(data.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setData(null);
      setError(err);
    } finally {
      setLoading(false);
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
    fetchBeansData();
  };

  return (
    // Have a shodown this card for selector
    <div className="beanSelectorWrapper">
      <h2>Find the perfect coffee for you</h2>
      <Box className="box">
        {/* Slider for selecting roast level */}
        <div className="roastLevel">
          <p>Roast level</p>
          <Slider
            aria-label="Roast Level"
            defaultValue={33}
            getAriaValueText={(value: number) => `${value}°C`}
            step={null}
            marks={marks}
            onChange={handleSliderChange}
          />
        </div>
        <div className="type">
          {/* Checkboxes for selecting brands */}
          <p>Type</p>
          <FormGroup className="typeOptions">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes("arabica")}
                  onChange={() => handleCheckboxChange("arabica")}
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
                  checked={checkedItems.includes("robusta")}
                  onChange={() => handleCheckboxChange("robusta")}
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
                  checked={checkedItems.includes("blend")}
                  onChange={() => handleCheckboxChange("blend")}
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
        </div>
      </Box>
    </div>
  );
};

export default BeanSelector;
