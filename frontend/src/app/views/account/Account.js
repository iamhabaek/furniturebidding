import { Loading } from "@gull";
import React, { Suspense } from "react";
import AccountLayout from "./AccountLayout";
const Account = ({ route }) => {
  return (
    <div>
      <Suspense>
        <AccountLayout routes={route.routes}></AccountLayout>
      </Suspense>
    </div>
  );
};

export default Account;
