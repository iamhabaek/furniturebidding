import React, { Component, Suspense } from "react";
import Layout1 from "./Layout1/Layout1";
const GullLayout = ({ route }) => {
  return (
    <Suspense>
      <Layout1 routes={route.routes}></Layout1>
    </Suspense>
  );
};

export default GullLayout;
