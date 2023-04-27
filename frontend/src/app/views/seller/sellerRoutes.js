import React from "react";
import { lazy } from "react";
import Seller from "./Seller";

const MyProducts = lazy(() => import("./components/MyProducts"));
const AddProduct = lazy(() => import("./components/AddProduct"));
const CreateInvoice = lazy(() => import("./components/CreateInvoice"));
const sellerRoutes = [
  {
    path: "/seller",
    component: Seller,
    routes: [
      {
        path: "/seller/add-product",
        component: AddProduct,
      },
      {
        path: "/seller/my-products",
        component: MyProducts,
      },
      {
        path: "/seller/add-invoice/:id",
        component: CreateInvoice,
      },
    ],
  },
];

export default sellerRoutes;
