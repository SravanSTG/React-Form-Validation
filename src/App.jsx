import { useState } from "react";
import FormInput from "./components/FormInput";
import { inputs } from "./data/inputsData";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [inputsArr, setInputsArr] = useState(inputs);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;
    const updatedInputs = [...inputsArr];

    // Check if username is between 4 to 16 characters
    updatedInputs[0].isValid = username.length >= 4 && username.length <= 16;

    // Check if the email address is valid
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    updatedInputs[2].isValid = regexEmail.test(email);

    // Check if password follows the rules
    const regexPassword =
      /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()? "]).*$/;
    updatedInputs[3].isValid = regexPassword.test(password);

    // Check if password and confirm password match
    updatedInputs[4].isValid = password === confirmPassword;

    setInputsArr(updatedInputs);

    let invalidFlag;

    inputsArr.map((input) => {
      if (!input.isValid) {
        invalidFlag = true;
        setIsSubmit(false);
      }
    });

    if (!invalidFlag) {
      setIsSubmit(true);
      setFormData({
        username: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="container">
      {isSubmit && (
        <div>
          <h1 className="formSubmitSuccessMessage">
            Form submission successful!
          </h1>
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <h1>Form</h1>
        {inputsArr.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formData[input.name]}
            handleChange={handleChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
