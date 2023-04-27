import React, { Component, Fragment } from "react";
import GullLayout from "app/GullLayout/GullLayout";
import { useAuth } from "app/appContext";
import { Redirect } from "react-router-dom";
const AuthGuard = ({ route }) => {
  const { user } = useAuth();
  return (
    <Fragment>
      {user ? (
        <GullLayout route={route}></GullLayout>
      ) : (
        <Redirect to="/session/signin" />
      )}
    </Fragment>
  );
};
export default AuthGuard;
