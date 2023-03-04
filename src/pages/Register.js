import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { validate } from "../helper/validate";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

const Register = ({ users }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    register: "",
  });

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("users", users);

  const handleUserInput = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: validate(e.target.name, e.target.value),
    });
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationError = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationError[name] = error;
      }
    });

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      return;
    }
    const findUser = users.find(
      (user) => user.email === fields.email || user.username === fields.username
    );
    console.log("findUser", findUser);
    if (findUser === undefined) {
      dispatch({ type: "ADD_USER", data: fields });
      return Navigate("/login");
    } else {
      errors.register = "Username or email already exist";
    }
  };
  console.log(fields);
  // console.log();

  return (
    <div className="container">
      <CustomInput
        label="Username"
        type="text"
        value={fields.username}
        name="username"
        handleChange={handleUserInput}
        error={errors.username}
      />
      <CustomInput
        label="email"
        type="email"
        value={fields.email}
        name="email"
        handleChange={handleUserInput}
        error={errors.email}
      />
      <CustomInput
        label="password"
        type="password"
        value={fields.password}
        name="password"
        handleChange={handleUserInput}
        error={errors.password}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p className="error">{errors.register}</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}
export default connect(mapStateToProps)(Register);
