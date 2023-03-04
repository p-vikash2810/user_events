export function validate(name, value) {
  switch (name) {
    case "username":
      if (!value || value.trim() === "") {
        return "username is Required";
      } else if (value.length < 8) {
        return "username should atleast 8 char";
      } else {
        return "";
      }
    case "email":
      if (!value) {
        return "Email is Required";
      } else if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        return "Enter a valid email address";
      } else {
        return "";
      }
    case "password":
      if (!value) {
        return "Password is Required";
      } else if (value.length < 8) {
        return "Please fill at least 8 character";
      } else if (!value.match(/[a-z]/g)) {
        return "Please enter at least lower character.";
      } else if (!value.match(/[A-Z]/g)) {
        return "Please enter at least upper character.";
      } else if (!value.match(/[0-9]/g)) {
        return "Please enter at least one digit.";
      } else {
        return "";
      }

    default:
      break;
  }
}
