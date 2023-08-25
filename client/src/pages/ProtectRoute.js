import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../components";

const ProtectRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  //由於在AppContext 的起始state userLoading為true
  //會執行此loading comp 而不會是下一段
  //這個protextRoute是同步事件 會比refesh後觸發的
  //getCurrentUser 非同步事件早發生
  //故此時還未有user
  //當取得user後 dispatch update state
  //useLoading  = false
  if (userLoading) return <Loading />;

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};
export default ProtectRoute;
