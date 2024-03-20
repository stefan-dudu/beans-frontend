import React, { useState, useEffect } from "react";

interface SearchResult {
  brand: string;
  id: number;
  name: string;
}

const DynamicSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to fetch data based on search term
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://beans-be.vercel.app/api/v1/beans/search-bean/${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    // Trigger search only when searchTerm has at least 2 characters
    if (searchTerm.trim().length >= 2) {
      fetchData();
    } else {
      // Reset search results if searchTerm is empty or less than 2 characters
      setSearchResults([]);
    }
  }, [searchTerm]);

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        searchTerm.trim().length >= 2 && ( // Display results only if searchTerm has at least 2 characters
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>
                Name: {item.name} by {item.brand}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default DynamicSearchBar;
