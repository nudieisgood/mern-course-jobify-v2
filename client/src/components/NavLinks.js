import { NavLink } from "react-router-dom";
import links from "../utlits/links";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, icon, text } = link;
        return (
          <NavLink
            onClick={toggleSidebar}
            className="nav-link"
            to={path}
            key={id}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
