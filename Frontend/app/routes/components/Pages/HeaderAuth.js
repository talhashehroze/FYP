import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { LogoThemed } from "./../LogoThemed/LogoThemed";

const HeaderAuth = (props) => (
  <div className="mb-12">
    <div className="mb-4 text-center">
      <Link to="/" className="d-inline-block">
        {props.icon ? (
          <i className={`fa fa-${props.icon} fa-3x ${props.iconClassName}`}></i>
        ) : (
          <LogoThemed checkBackground height="30" />
        )}
      </Link>
    </div>
    <h5 className="text-center mb-4">{props.title}</h5>
    <p className="text-center">{"to use Whats Trending? An Account is required"}</p>
  </div>
);
HeaderAuth.propTypes = {
  icon: PropTypes.node,
  iconClassName: PropTypes.node,
  title: PropTypes.node,
  text: PropTypes.node,
};
HeaderAuth.defaultProps = {
  title: "Waiting for Data...",
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure voluptas aperiam odit, reiciendis dicta nihil.",
  iconClassName: "text-theme",
};

export { HeaderAuth };
