import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.scss";
import logo from "../assets/logo2.webp";
import { NavLink } from "react-router-dom";
import DynamicSearchBar from "./searchBar/DynamicSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

import { expand, minimize } from "../store/navBar/NavBarSlice";

function NavigationBar() {
  const dispatch = useDispatch<AppDispatch>();
  const isExpanded = useSelector((state: RootState) => state.navBar.expanded);
  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      // defaultExpanded
      className="bg-body-tertiary"
      sticky="top"
      expanded={isExpanded}
    >
      <Container fluid>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            !isExpanded ? dispatch(expand()) : dispatch(minimize());
          }}
        />
        <div className="logoSearch">
          <Nav.Link
            as={NavLink}
            to=""
            onClick={() => dispatch(minimize())}
            // onClick={() => {
            //   !isExpanded ? dispatch(expand()) : dispatch(minimize());
            // }}
          >
            <img
              src={logo}
              style={{ width: "55px", height: "55px" }}
              className="d-inline-block align-top"
              alt="Coffee logo"
              // loading="lazy"
              fetchpriority="high"
              title="Coffee reviews logo"
            />
          </Nav.Link>
          <DynamicSearchBar />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container className="containerStyle" fluid="sm">
            <Nav className="searchAndLinksContainer">
              <Nav.Link
                as={NavLink}
                to="/locations"
                onClick={() => dispatch(minimize())}
                className="link-text"
                style={{ textAlign: "center" }}
              >
                <h3>Coffee map</h3>
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/guides"
                onClick={() => dispatch(minimize())}
                className="link-text"
              >
                <h3>Guides</h3>
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/explore"
                onClick={() => dispatch(minimize())}
                className="link-text"
              >
                <h3>Explore</h3>
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/favourites"
                onClick={() => dispatch(minimize())}
                className="link-text"
              >
                <h3>Favourites</h3>
              </Nav.Link>

              {/* <Nav.Link
                as={NavLink}
                to="/roasteries"
                onClick={() => dispatch(minimize())}
              >
                Roasteries
              </Nav.Link> */}
            </Nav>
          </Container>
          {!signedIn ? (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/signup"
                onClick={() => dispatch(minimize())}
                style={{ color: "#006241" }}
                className="link-text"
              >
                <h3>Sign up</h3>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/profile"
                onClick={() => dispatch(minimize())}
                className="link-text"
              >
                <h3>Profile</h3>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
