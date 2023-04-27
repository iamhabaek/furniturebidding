import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const ProductDetails = lazy(() => import("./ProductDetails"));
const BiddingWinner = lazy(() => import("./BiddingWinner"));

const homeRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/product/details/:id",
    component: ProductDetails,
  },
  {
    path: "/product/winner/:id",
    component: BiddingWinner,
  },
];

export default homeRoutes;
