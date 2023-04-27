import React, { Component, Suspense } from "react";
import { renderRoutes } from "react-router-config";
import Loading from "@gull/components/GullLoadable/Loading";
import { classList } from "@utils";
import SellerSidenav from "./SellerSidenav";
const AccountLayout = ({ routes }) => {
  return (
    <div>
      {/* <div> */}
      {/* <div className={`app-admin-wrap layout-sidebar-large`}> */}
      <SellerSidenav></SellerSidenav>
      <div
        className={classList({
          "main-content-wrap d-flex flex-column": true,
          "sidenav-open": true,
        })}
      >
        <Suspense fallback={<Loading />}>
          <div className="main-content">{renderRoutes(routes)}</div>
        </Suspense>
        {/* </div>
        </div> */}
      </div>
    </div>
  );
};

export default AccountLayout;
