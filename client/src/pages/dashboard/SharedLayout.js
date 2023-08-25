import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet } from "react-router-dom";
import { Navbar, BigSidebar, SmallSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <div className="dashboard">
        <BigSidebar />
        <SmallSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SharedLayout;
