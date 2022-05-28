import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul className="Navigation_lists">
        <li className="Home_list">
          <Link to="/">Home</Link>
          {/* <FontAwesomeIcon icon={brands} color={"#04AAFF"} size="2x" /> */}
        </li>
        <li className="Profile_list">
          <Link to="/Profile">{userObj.displayName}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
