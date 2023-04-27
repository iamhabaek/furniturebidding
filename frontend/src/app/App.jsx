import "../fake-db";
import React, { Suspense } from "react";
import "../styles/app/app.scss";
import { Router } from "react-router-dom";
import history from "@history";

import { renderRoutes } from "react-router-config";
import Auth from "./auth/Auth";
import RootRoutes from "./RootRoutes";
import { AppProvider } from "./appContext";
import { Loading } from "@gull";

function App() {
  return (
    <AppProvider>
      <Auth>
        <Suspense fallback={<Loading></Loading>}>
          <Router history={history}>{renderRoutes(RootRoutes)}</Router>
        </Suspense>
      </Auth>
    </AppProvider>
  );
}

export default App;
