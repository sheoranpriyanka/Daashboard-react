import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";

import { Nav } from "reactstrap";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { ThemeContext, themes } from "contexts/ThemeContext";

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const { routes } = props;

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <div className="sidebar" data={color ?? "darkBlue"}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <Nav>
              {routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    {prop.name !== "Theme" ? (
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        onClick={props.toggleSidebar}
                      >
                        {prop.icon}
                        <span style={{ fontWeight: 500, marginLeft: "20px" }}>
                          {prop.name}
                        </span>
                      </NavLink>
                    ) : (
                      <ThemeContext.Consumer>
                        {({ theme, changeTheme }) => (
                          <>
                            {console.log(theme)}
                            {theme === "" ? (
                              <a
                                href="#"
                                onClick={() => {
                                  changeTheme(themes.light);
                                  changeColor("grey");
                                }}
                              >
                                <svg
                                  width="14"
                                  height="18"
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.5 1.8C8.469 1.8 11.7 5.031 11.7 9C11.7 12.969 8.469 16.2 4.5 16.2C4.194 16.2 3.888 16.182 3.591 16.137C5.31 14.193 6.3 11.655 6.3 9C6.3 6.345 5.31 3.807 3.591 1.863C3.888 1.818 4.194 1.8 4.5 1.8ZM4.5 0C2.862 0 1.323 0.45 0 1.215C2.691 2.772 4.5 5.67 4.5 9C4.5 12.33 2.691 15.228 0 16.785C1.323 17.55 2.862 18 4.5 18C9.468 18 13.5 13.968 13.5 9C13.5 4.032 9.468 0 4.5 0Z"
                                    fill="white"
                                  />
                                </svg>

                                <span
                                  style={{
                                    fontWeight: 500,
                                    marginLeft: "20px",
                                  }}
                                >
                                  Dark {prop.name}
                                </span>
                              </a>
                            ) : (
                              <a
                                href="#"
                                onClick={() => {
                                  changeTheme(themes.dark);
                                  changeColor("darkBlue");
                                }}
                              >
                                <svg
                                  width="19"
                                  height="18"
                                  viewBox="0 0 19 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.73425 3.52603L3.25479 2.05479L2.09589 3.2137L3.56712 4.68493L4.73425 3.52603ZM0 8.17808H2.46575V9.82192H0V8.17808ZM8.21918 0H9.86301V2.42466H8.21918V0ZM14.8274 2.05068L15.9847 3.20712L14.5134 4.67836L13.357 3.5211L14.8274 2.05068ZM13.3479 14.474L14.8192 15.9534L15.9781 14.7945L14.4986 13.3233L13.3479 14.474ZM15.6164 8.17808H18.0822V9.82192H15.6164V8.17808ZM9.0411 4.06849C6.32055 4.06849 4.10959 6.27945 4.10959 9C4.10959 11.7205 6.32055 13.9315 9.0411 13.9315C11.7616 13.9315 13.9726 11.7205 13.9726 9C13.9726 6.27945 11.7616 4.06849 9.0411 4.06849ZM9.0411 12.2877C7.22466 12.2877 5.75342 10.8164 5.75342 9C5.75342 7.18356 7.22466 5.71233 9.0411 5.71233C10.8575 5.71233 12.3288 7.18356 12.3288 9C12.3288 10.8164 10.8575 12.2877 9.0411 12.2877ZM8.21918 15.5753H9.86301V18H8.21918V15.5753ZM2.09589 14.7863L3.25479 15.9452L4.72603 14.4658L3.56712 13.3068L2.09589 14.7863Z"
                                    fill="white"
                                  />
                                </svg>

                                <span
                                  style={{
                                    fontWeight: 500,
                                    marginLeft: "20px",
                                  }}
                                >
                                  Light {prop.name}
                                </span>
                              </a>
                            )}
                          </>
                        )}
                      </ThemeContext.Consumer>
                    )}{" "}
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;
