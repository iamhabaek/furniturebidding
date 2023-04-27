import React from "react";

const Profile = () => {
  return (
    <div>
      {" "}
      <div className="col-lg-12 mb-3">
        <div className="card">
          <div className="card-header bg-transparent">
            <h3 className="card-title"> Right Action Bar</h3>
          </div>
          <form action="">
            <div className="card-body">
              <div className="form-row ">
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4" className="ul-form__label">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                  />
                  <small
                    id="passwordHelpBlock"
                    className="ul-form__text form-text "
                  >
                    Please enter your full name
                  </small>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4" className="ul-form__label">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter full name"
                  />
                  <small
                    id="passwordHelpBlock"
                    className="ul-form__text form-text "
                  >
                    We'll never share your email with anyone else
                  </small>
                </div>
              </div>
              <div className="custom-separator"></div>
              <div className="card-title">Communication:</div>
              <label className="checkbox checkbox-primary">
                <input type="checkbox" />
                <span>Email</span>
                <span className="checkmark"></span>
              </label>
              <label className="checkbox checkbox-primary">
                <input type="checkbox" />
                <span>SMS</span>
                <span className="checkmark"></span>
              </label>
              <label className="checkbox checkbox-primary">
                <input type="checkbox" />
                <span>Phone</span>
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="card-footer bg-transparent">
              <div className="mc-footer">
                <div className="row">
                  <div className="col-lg-12 text-right">
                    <button type="button" className="btn  btn-primary m-1">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary m-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
