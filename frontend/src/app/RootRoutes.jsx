import React from "react";
import { Redirect } from "react-router-dom";
import sessionsRoutes from "./views/sessions/sessionsRoutes";
import AuthGuard from "./auth/AuthGuard";
import homeRoutes from "./views/home/homeRoutes";
import accountRoutes from "./views/account/accountRoutes";
import sellerRoutes from "./views/seller/sellerRoutes";
const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionsRoutes,
  {
    path: "/",
    component: AuthGuard,
    routes: [
      ...homeRoutes,
      ...accountRoutes,
      ...sellerRoutes,
      ...redirectRoute,
      ...errorRoute,
    ],
  },
];

export default routes;
