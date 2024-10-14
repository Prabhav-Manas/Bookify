import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

const MyNavBar = () => {
  const firebase = useFirebase();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.signOut();
    navigate("/", { replace: true });
  };

  if (!firebase.isLoggedIn) {
    return null;
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bgNavColor">
      <Container>
        <Navbar.Brand to="" className="text-white brand">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto ">
            <Link to="/" className="text-white link">
              Home
            </Link>
            &nbsp;&nbsp;
            <Link to="/books/listing" className="text-white link">
              Add Listing
            </Link>
            &nbsp;&nbsp;
            <Link to="/book/orders" className="text-white link">
              Orders
            </Link>
            &nbsp;&nbsp;
            <Link to={"/cart"} className="text-white link cart">
              Cart
            </Link>
            &nbsp;&nbsp;
            <Link className="text-white link signOut" onClick={handleLogout}>
              {firebase.isLoggedIn ? "Sign out" : "Sign in"}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavBar;
