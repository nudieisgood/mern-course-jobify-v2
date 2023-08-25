const FormRow = ({ value, onChange, labelText, type, name }) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
