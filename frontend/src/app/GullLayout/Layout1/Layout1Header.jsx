import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Container, Dropdown, Navbar, NavLink } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import { Link } from "react-router-dom";
import { useAuth } from "app/appContext";
import LetteredAvatar from "react-lettered-avatar";
import Avatar from "react-avatar";
import { Fragment } from "react";
const Layout1Header = () => {
  const { user, logout } = useAuth();
  console.log(user.photoURL);
  return (
    <Fragment>
      <div className="main-header p-3 bg-info">
        <div className="logo">
          <h3>
            <Link to="/home" className="text-white">
              Furniture Bidding
            </Link>
          </h3>
        </div>

        <div style={{ margin: "auto" }}></div>
        <div className="header-part-right">
          <Link to="/seller/my-products" className="text-white text-12">
            Bidder Centre
          </Link>
          <Dropdown>
            <Dropdown.Toggle as="span" className="toggle-hidden cursor-pointer">
              <div
                className="badge-top-container"
                role="button"
                id="dropdownNotification"
                data-toggle="dropdown"
              >
                <span className="badge badge-primary">0</span>
                <i className="i-Bell bg-info text-white header-icon"></i>
              </div>
            </Dropdown.Toggle>

            <DropdownMenu className="notification-dropdown rtl-ps-none"></DropdownMenu>
          </Dropdown>

          <div className="user col align-self-end">
            <Dropdown>
              <DropdownToggle
                as="span"
                className="toggle-hidden cursor-pointer"
              >
                {user.photoURL ? (
                  <Avatar src={user.photoURL} size={50} round />
                ) : (
                  <Avatar
                    name={`${user.displayName ? user.displayName : user.email}`}
                    size={50}
                    round
                  />
                )}
              </DropdownToggle>
              <DropdownMenu>
                <div className="dropdown-header">
                  <i className="i-Lock-User mr-1"></i>{" "}
                  {user.displayName ? user.displayName : user.email}
                </div>
                {/* <Link to="/account" className="dropdown-item cursor-pointer">
                  My Account
                </Link> */}
                <Link
                  to="/account/profile"
                  className="dropdown-item cursor-pointer"
                >
                  My Biddings
                </Link>
                <Link
                  to="/session/signin"
                  className="dropdown-item cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </Link>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Layout1Header;
