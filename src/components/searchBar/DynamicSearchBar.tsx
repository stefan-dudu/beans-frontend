import React, { SyntheticEvent, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DynamicSearchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { minimize } from "../../store/navBar/NavBarSlice";
import catchBeanBag from "../../assets/catchBeanBag.webp";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

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
  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks

  useEffect(() => {
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

    if (searchTerm.trim().length >= 2) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const redirectToLogin = () => {
    navigate(`/login`, { replace: true });
    setSearchTerm("");
  };

  const redirectToCreateBean = () => {
    navigate(`/createbean`);
    setSearchTerm("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function addDefaultSrc(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = catchBeanBag;
  }

  const SearchResultRow: React.FC<{ item: SearchResult; index: number }> = ({
    item,
    index,
  }) => (
    <Link to={`/coffee/${item._id}`} style={{ width: "100%" }}>
      <div
        key={index}
        onClick={() => {
          setSearchTerm("");
          dispatch(minimize());
        }}
        className="SearchResultRow"
      >
        <img
          src={item?.image || catchBeanBag}
          style={{ width: "5rem", height: "5rem", marginLeft: "10px" }}
          alt="Pic of the coffee bean that is the result of search bar"
          onError={addDefaultSrc}
          loading="lazy"
          title="Image of the coffee bag"
        />
        <div className="rightSide">
          <p className="title">{item.name}</p>
          <p className="subtitle">by {item.brand}</p>
        </div>
      </div>
    </Link>
  );

  const handleCreateMissingBean = () => {
    setSearchTerm("");
    dispatch(minimize());
    signedIn ? redirectToCreateBean() : redirectToLogin();
  };

  return (
    <div className="SearchWrapper" ref={wrapperRef}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          // label="Search for coffee"
          value={searchTerm}
          onChange={handleChange}
          variant="standard"
        />
      </Box>
      {loading ? (
        <div className="resultWrapper">
          <p className="loadingText">Loading...</p>
        </div>
      ) : searchTerm.trim().length >= 2 && searchResults.length === 0 ? (
        <div className="resultWrapper">
          <p className="loadingText" onClick={handleCreateMissingBean}>
            Add new coffee!
          </p>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div className="resultWrapper">
            {/* TODO: to fetch only 4 result or how many we will show, to improve speed */}
            {searchResults.slice(0, 4).map((item, index) => (
              <SearchResultRow item={item} index={index} key={index} />
            ))}
            {searchResults.length > 4 && (
              <div
                className="view-more"
                onClick={() => {
                  // TODO: navigate here, pass data ( all of it, will show), pass the term that was searched by
                  // TODO: clise the search results and then navigate, now it happens a bit off, i can still see the results, but i am on the result page
                  setSearchTerm("");
                  dispatch(minimize());
                  navigate("/search", { state: { searchResults, searchTerm } });
                }}
              >
                View more results
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default DynamicSearchBar;
