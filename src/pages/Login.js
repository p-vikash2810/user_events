import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { validate } from "../helper/validate";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_ACTIVE_USER } from "../redux/activeUser/activeUserActionType";

const Login = ({ users }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();

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
    }

    const findUser = users.find((user) => user.email === fields.email);
    console.log("findUser", findUser);
    if (findUser === undefined) {
      setErrors({
        ...errors,
        login: "user not found",
      });
    } else if (
      findUser?.email === fields.email &&
      findUser?.password === fields.password
    ) {
      dispatch({ type: SET_ACTIVE_USER, data: fields });
      return Navigate("/event");
    } else {
      setErrors({
        ...errors,
        login: "Invalid email or password",
      });
    }
  };

  return (
    <div className="container">
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
      <p className="error">{errors.login}</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(Login);
