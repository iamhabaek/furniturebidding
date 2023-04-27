import React, { Component, Suspense } from "react";
import { renderRoutes } from "react-router-config";
import Layout1Header from "./Layout1Header";
import Loading from "@gull/components/GullLoadable/Loading";
import { classList } from "@utils";

const Layout1 = ({ routes }) => {
  return (
    <div>
      <div className={`app-admin-wrap layout-sidebar-large`}>
        <Layout1Header></Layout1Header>
        <div
          className={classList({
            "main-content-wrap d-flex flex-column": true,
          })}
        >
          <Suspense fallback={<Loading />}>
            <div className="main-content">{renderRoutes(routes)}</div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout1;
