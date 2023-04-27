import React, { Component, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "app/appContext";
const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email is required"),
});

const ForgotPassword = () => {
  const { resetPassword, loginWithGoogle, loginWithFacebook } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();
  const handleSubmit = async (values) => {
    try {
      await resetPassword(values.email);
      history.push("/session/signin");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleLoginWithGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleLoginWithFacebook = async () => {
    try {
      setLoading(true);
      await loginWithFacebook();
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div
      className="auth-layout-wrap"
      style={{
        backgroundImage: "url(/assets/images/photo-wide-4.jpg)",
      }}
    >
      <div className="auth-content">
        <div className="card o-hidden">
          <div className="row">
            <div className="col-md-6">
              <div className="p-4">
                <div className="auth-logo text-center mb-4">
                  <img src="/assets/images/logo.png" alt="" />
                </div>
                <h1 className="mb-3 text-18">Forgot Password</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={ForgotPasswordSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          className="form-control form-control-rounded position-relative"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <button
                        className="btn btn-rounded btn-primary btn-block mt-2"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </form>
                  )}
                </Formik>

                <div className="mt-3 text-center">
                  <Link to="/session/signin" className="text-muted">
                    <u>Signin</u>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 text-center "
              style={{
                backgroundSize: "cover",
                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
              }}
            >
              <div className="pr-3 auth-right">
                <Link
                  to="/session/signup"
                  className="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text"
                >
                  <i className="i-Mail-with-At-Sign"></i> Sign up with Email
                </Link>
                <Button
                  onClick={handleLoginWithGoogle}
                  className="btn btn-rounded btn-outline-google btn-block btn-icon-text"
                >
                  <i className="i-Google-Plus"></i> Sign up with Google
                </Button>
                <Button
                  onClick={handleLoginWithFacebook}
                  className="btn btn-rounded btn-block btn-icon-text btn-outline-facebook"
                >
                  <i className="i-Facebook-2"></i> Sign up with Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
