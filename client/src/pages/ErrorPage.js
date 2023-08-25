import image from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <img src={image} alt="errorPageImg" />
      <h3>Ohh! something went wrong</h3>
      <p></p>
      <Link to="/">back to home</Link>
    </Wrapper>
  );
};
export default ErrorPage;
