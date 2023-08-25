import Wrapper from "../assets/wrappers/Navbar";
import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, toggleSidebar, logout } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
            className="btn"
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
            <button type="button" onClick={logout} className="dropdown-btn">
              Log out
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
