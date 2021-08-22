import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      <Container className="mt-4">{children}</Container>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};
export default Layout;
