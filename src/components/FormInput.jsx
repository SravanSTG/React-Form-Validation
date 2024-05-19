import "./FormInput.css";

const FormInput = (props) => {
  const {
    label,
    type,
    placeholder,
    name,
    value,
    handleChange,
    required,
    errorMessage,
    isValid,
  } = props;

  return (
    <div className="formInputDiv">
      <label>
        {label}
        {required && <span className="requiredAsterisk">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
      {isValid === false && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
