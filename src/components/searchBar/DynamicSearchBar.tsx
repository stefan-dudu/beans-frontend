import React, { useState } from "react";

interface Props {
  data: string[];
}

const SearchBar: React.FC<Props> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchTerm && // Only render if searchTerm is not empty
          filteredData.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

const DynamicSearchBar: React.FC = () => {
  const data = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];

  return (
    <div>
      <h1>Dynamic Search Bar Example</h1>
      <SearchBar data={data} />
    </div>
  );
};

export default DynamicSearchBar;
