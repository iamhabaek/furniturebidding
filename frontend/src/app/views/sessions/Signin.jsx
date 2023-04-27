import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "app/appContext";
const SigninSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup.string().required("password is required"),
});

const Signin = () => {
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await login(email, password);
      history.push("/home");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };
  const handleLoginWithGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleLoginWithFacebook = async () => {
    try {
      setLoading(true);
      await loginWithFacebook();
      history.push("/");
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
                <h1 className="mb-3 text-18">Sign In</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={SigninSchema}
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
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          className="form-control form-control-rounded"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="d-flex flex-end">
                        <Button
                          className="btn btn-block btn-rounded "
                          variant="primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && (
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                              className="mr-1"
                            />
                          )}
                          Login
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>

                <div className="mt-3 text-center">
                  <Link to="/session/forgot-password" className="text-muted">
                    <u>Forgot Password?</u>
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
                  className="btn btn-rounded btn-outline-google btn-block btn-icon-text"
                  onClick={handleLoginWithGoogle}
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

export default Signin;
