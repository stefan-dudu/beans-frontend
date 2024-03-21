import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo2.png";
import { NavLink } from "react-router-dom";
import DynamicSearchBar from "./searchBar/DynamicSearchBar";

function NavigationBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav.Link as={NavLink} to="">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Nav.Link>
        {/* <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-4"
            aria-label="Search"
          />
        </Form> */}

        <DynamicSearchBar />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container>
            <Nav className="me-auto justify-content-md-center">
              <Nav.Link as={NavLink} to="/features">
                Features
              </Nav.Link>
              <Nav.Link as={NavLink} to="/locations">
                Locations
              </Nav.Link>
            </Nav>
          </Container>
          <Nav>
            <Nav.Link href="#deets">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
