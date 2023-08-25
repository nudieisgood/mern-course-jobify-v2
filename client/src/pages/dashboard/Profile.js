import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, displayAlert, showAlert, isLoading, updateUser } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            labelText="name"
            type="text"
            name="name"
          />
          <FormRow
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            labelText="last name"
            type="text"
            name="lastName"
          />
          <FormRow
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            labelText="e-mail"
            type="email"
            name="email"
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
