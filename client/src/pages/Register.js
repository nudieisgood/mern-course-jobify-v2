import { useState, useEffect } from "react";
import { FormRow, Logo, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialStates = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const { user, showAlert, displayAlert, setUpUser, isLoading } =
    useAppContext();

  const [values, setValues] = useState(initialStates);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      setUpUser({
        currentUser,
        endPoint: "login",
        alertText: "Welcome back!",
      });
    } else {
      setUpUser({
        currentUser,
        endPoint: "register",
        alertText: "Successfully register.",
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        {showAlert && <Alert />}
        <h3>{values.isMember ? "login" : "register"}</h3>
        {!values.isMember ? (
          <FormRow
            labelText="Name"
            value={values.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
        ) : null}
        <FormRow
          labelText="email"
          value={values.email}
          type="email"
          name="email"
          onChange={handleChange}
        />
        <FormRow
          labelText="password"
          value={values.password}
          type="text"
          name="password"
          onChange={handleChange}
        />

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          Submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
