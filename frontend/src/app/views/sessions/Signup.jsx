import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Spinner, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "app/appContext";
const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 character long")
    .required("password is required"),
  repassword: yup
    .string()
    .required("repeat password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
const Signup = () => {
  const { signup, loginWithGoogle, loginWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      setLoading(true);
      await signup(email, password);
      history.push("/home");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
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
            <div className="col-md-8">
              <div className="p-4">
                <h1 className="mb-3 text-18">Sign Up</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    repassword: "",
                  }}
                  validationSchema={SignupSchema}
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
                          name="email"
                          className="form-control form-control"
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          name="password"
                          className="form-control form-control"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="repassword">Retype password</label>
                        <input
                          name="repassword"
                          className="form-control form-control"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.repassword}
                        />
                        {errors.repassword && touched.repassword && (
                          <div className="text-danger mt-1 ml-2">
                            {errors.repassword}
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="primary" type="submit">
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
                          Sign Up
                        </Button>
                        <Link to="/session/signin">
                          Already have an account? Log In
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div
              className="col-md-4 text-center "
              style={{
                backgroundSize: "cover",
                backgroundImage: "url(/assets/images/photo-long-3.jpg)",
              }}
            >
              <div className="pr-3 auth-right">
                <div className="flex-grow-1"></div>
                <div className="w-100 mb-4">
                  <Button
                    onClick={handleLoginWithGoogle}
                    className="btn btn-outline-google btn-block btn-icon-text btn-rounded"
                  >
                    <i className="i-Google-Plus"></i> Sign in with Google
                  </Button>
                  <Button
                    onClick={handleLoginWithFacebook}
                    className="btn btn-outline-facebook btn-block btn-icon-text btn-rounded"
                  >
                    <i className="i-Facebook-2"></i> Sign in with Facebook
                  </Button>
                </div>
                <div className="flex-grow-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
