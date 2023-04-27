import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "app/appContext";
import ProductList from "./ProductList";
const Home = () => {
  const { products } = useAuth();
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
