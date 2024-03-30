import React, { SyntheticEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./DynamicSearchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { minimize } from "../../store/navBar/NavBarSlice";

interface SearchResult {
  brand: string;
  _id: string;
  name: string;
  image: string;
}

const DynamicSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isExpanded = useSelector((state: RootState) => state.navBar.expanded);

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data based on search term
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
  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src =
      "https://baristretto-bucket.s3.eu-central-1.amazonaws.com/catchBeanBag.jpg";
  }

  const SearchResultRow: React.FC<{ item: SearchResult; index: number }> = ({
    item,
    index,
  }) => {
    // console.log("item", item);
    return (
      <Link to={`/coffee/${item._id}`} style={{ width: "100%" }}>
        {/* TODO: close navbar after been redirected to page */}
        <div
          key={index}
          onClick={() => {
            setSearchTerm("");
            dispatch(minimize());
          }}
          className="SearchResultRow"
        >
          <img
            src={item?.image}
            style={{ width: "5rem", height: "5rem", marginLeft: "10px" }}
            // width="10rem"
            // height="10rem"
            // className="d-inline-block align-top"
            alt="React Bootstrap logo"
            onError={addDefaultSrc}
          />
          <div className="rightSide">
            <p className="title">{item.name}</p>
            <p className="subtitle">by {item.brand}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="SearchWrapper">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {loading ? (
        <div className="resultWrapper">
          <p className="loadingText">Loading...</p>
        </div>
      ) : (
        searchTerm.trim().length >= 2 && // Display results only if searchTerm has at least 2 characters
        searchResults.length > 0 && (
          <div className="resultWrapper">
            {searchResults.slice(0, 4).map((item, index) => (
              <SearchResultRow item={item} index={index} />
            ))}
            {searchResults.length > 4 && (
              <p
                style={{ color: "black" }}
                onClick={() => {
                  // TODO: navigate here, pass data ( all of it, will show), pass the term that was searched by
                  // TODO: clise the search results and then navigate, now it happens a bit off, i can still see the results, but i am on the result page
                  dispatch(minimize());
                  navigate("/search", { state: "data" });
                }}
              >
                View more results
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default DynamicSearchBar;
