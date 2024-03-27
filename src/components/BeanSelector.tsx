import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  const [roastLevel, setRoastLevel] = useState("");
  const [data, setData] = useState<Coffee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);

  const navigate = useNavigate();

  const marks = [
    {
      value: 0,
      label: "Light",
    },
    {
      value: 20,
      label: "Medium",
    },
    {
      value: 50,
      label: "Medium-Dark",
    },

    {
      value: 80,
      label: "Dark ",
    },
    {
      value: 100,
      label: "Very Dark",
    },
  ];

  const FetchBeansData = async () => {
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
      console.log("data from req", data);
      data.results > 0 && navigate("/explore", { state: data.data });
      setData(data.data);
      setError(null);
    } catch (err: any) {
      setData(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  function valuetext(value: number) {
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
    return `${value}°C`;
  }

  const handleChange = (label: string) => {
    // Check if the label already exists in the array
    const currentIndex = checkedItems.indexOf(label);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      // If the label is not in the array, add it
      newCheckedItems.push(label);
    } else {
      // If the label is already in the array, remove it
      newCheckedItems.splice(currentIndex, 1);
    }

    // Update the state with the new array of checked labels
    setCheckedItems(newCheckedItems);
  };

  const FindHandler = () => {
    FetchBeansData();
    // navigate("/explore", { state: "test data passed" });
  };

  //   console.log("checkedItems", checkedItems);
  return (
    <div>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Custom marks"
          defaultValue={20}
          getAriaValueText={valuetext}
          step={null}
          marks={marks}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.includes("Starbucks")}
                onChange={() => handleChange("Starbucks")}
              />
            }
            label="Starbucks"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.includes("Origo")}
                onChange={() => handleChange("Origo")}
              />
            }
            label="Origo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.includes("Costa")}
                onChange={() => handleChange("Costa")}
              />
            }
            label="Costa"
          />
        </FormGroup>

        <Button variant="contained" onClick={() => FindHandler()}>
          Find your bean
        </Button>
      </Box>
    </div>
  );
};

export default BeanSelector;
