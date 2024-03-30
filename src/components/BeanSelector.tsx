import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
    { value: 20, label: "Medium" },
    { value: 50, label: "Medium-Dark" },
    { value: 80, label: "Dark" },
    { value: 100, label: "Very Dark" },
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
            brand: checkedItems,
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
      case 20:
        setRoastLevel("Medium");
        break;
      case 50:
        setRoastLevel("Medium-Dark");
        break;
      case 80:
        setRoastLevel("Dark");
        break;
      case 100:
        setRoastLevel("Very Dark");
        break;
      default:
        setRoastLevel("Medium");
    }
  };

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
    <div>
      <Box sx={{ width: 300 }}>
        {/* Slider for selecting roast level */}
        <Slider
          aria-label="Roast Level"
          defaultValue={20}
          getAriaValueText={(value: number) => `${value}°C`}
          step={null}
          marks={marks}
          onChange={handleSliderChange}
        />

        {/* Checkboxes for selecting brands */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.includes("Starbucks")}
                onChange={() => handleCheckboxChange("Starbucks")}
              />
            }
            label="Starbucks"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.includes("Origo")}
                onChange={() => handleCheckboxChange("Origo")}
              />
            }
            label="Origo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.includes("Costa")}
                onChange={() => handleCheckboxChange("Costa")}
              />
            }
            label="Costa"
          />
        </FormGroup>

        {/* Button to trigger bean search */}
        <Button variant="contained" onClick={handleFindButtonClick}>
          Find your bean
        </Button>
      </Box>
    </div>
  );
};

export default BeanSelector;
