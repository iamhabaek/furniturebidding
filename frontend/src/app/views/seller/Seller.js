import { Loading } from "@gull";
import React, { Suspense } from "react";
import AccountLayout from "./SellerLayout";
const Seller = ({ route }) => {
  return (
    <div>
      <Suspense>
        <AccountLayout routes={route.routes}></AccountLayout>
      </Suspense>
    </div>
  );
};

export default Seller;
