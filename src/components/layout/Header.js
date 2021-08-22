import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavbarText } from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="shadow">
        <Link to="/" className="navbar-brand">
          React From Builder
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavbarText>
              Text, Multichoice Checkbox, Single Select Radio
            </NavbarText>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
