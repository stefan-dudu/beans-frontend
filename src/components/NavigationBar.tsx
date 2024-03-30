import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.scss";
import logo from "../assets/logo2.png";
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
      expand="lg"
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
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Nav.Link>
          <DynamicSearchBar />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container className="containerStyle">
            <Nav className="searchAndLinksContainer">
              <Nav.Link
                as={NavLink}
                to="/explore"
                onClick={() => dispatch(minimize())}
              >
                Explore
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/features"
                onClick={() => dispatch(minimize())}
              >
                Features
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/locations"
                onClick={() => dispatch(minimize())}
              >
                Locations
              </Nav.Link>
            </Nav>
          </Container>
          {!signedIn ? (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/signup"
                onClick={() => dispatch(minimize())}
              >
                Sign up
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/profile"
                onClick={() => dispatch(minimize())}
              >
                User profile
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
