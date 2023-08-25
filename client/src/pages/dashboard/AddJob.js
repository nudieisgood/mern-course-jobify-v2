import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, FormRowSelect } from "../../components";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    jobInputChange,
    displayAlert,
    showAlert,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !position || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      // do job editing
      editJob();
      return;
    }
    // create job
    createJob();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    jobInputChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            value={company}
            onChange={handleChange}
            labelText="company"
            type="text"
            name="company"
          />
          <FormRow
            value={position}
            onChange={handleChange}
            labelText="position"
            type="text"
            name="position"
          />
          <FormRow
            value={jobLocation}
            onChange={handleChange}
            labelText="job location"
            type="text"
            name="jobLocation"
          />
          {/* select input -  jobType*/}
          <FormRowSelect
            value={jobType}
            name="jobType"
            labelText="job type"
            onChange={handleChange}
            options={jobTypeOptions}
          />
          <FormRowSelect
            value={status}
            name="status"
            onChange={handleChange}
            options={statusOptions}
            labelText="job status"
          />
          {/* select input -  status*/}
          <div className="btn-container">
            <button
              type="sbmit"
              onClick={handleSubmit}
              className="btn btn-block"
            >
              Submit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              className="btn btn-block clear-btn"
              disabled={isLoading}
            >
              Reset/Add Job
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
