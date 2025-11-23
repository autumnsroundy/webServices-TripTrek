module.exports = {
  userName: "required|string|min:3|max:30",
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  password: "required|string|min:6"
};
