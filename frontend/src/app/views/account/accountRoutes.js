import React from "react";
import Account from "./Account";
import { lazy } from "react";
const Profile = lazy(() => import("./components/Profile"));
const MyBids = lazy(() => import("./components/MyBids"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const Addresses = lazy(() => import("./components/Addresses"));
const WonBids = lazy(() => import("./components/WonBids"));
const accountRoutes = [
  {
    path: "/account",
    component: Account,
    routes: [
      {
        path: "/account/profile",
        component: Profile,
      },
      {
        path: "/account/my-bids",
        component: MyBids,
      },
      {
        path: "/account/addresses",
        component: Addresses,
      },
      {
        path: "/account/change-password",
        component: ChangePassword,
      },
      {
        path: "/account/won-bids",
        component: ChangePassword,
      },
    ],
  },
];

export default accountRoutes;
