import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExploreRow from "../components/ExploreRow";
import TextField from "@mui/material/TextField";
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

const Search = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Coffee[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/search-bean/${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setSearchTerm(state.searchTerm);
    setSearchResults(state.searchResults);
    console.log("this use eff is ran");
  }, [state]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm && searchTerm.length > 2) {
        fetchData();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div>
      <h2>Search bar</h2>
      <TextField
        id="standard-basic"
        // label="Standard"
        variant="standard"
        placeholder="Search for something"
        value={searchTerm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        }}
      />
      {searchResults &&
        searchResults.map((el) => {
          return <ExploreRow key={el._id} data={el} />;
        })}
    </div>
  );
};

export default Search;
