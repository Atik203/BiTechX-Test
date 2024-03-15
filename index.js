const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// test data
let User = [
  { username: "test1", password: "test1" },
  { username: "test2", password: "test2" },
  { username: "test3", password: "test3" },
];

// get all users
app.get("/users", (req, res) => {
  res.json(User);
});

// login user
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = User.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.status(200).json({ message: "Login Success", user });
  } else {
    res.status(401).json({ message: "Login Failed" });
  }
});

// signup user
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = User.find((user) => user.username === username);
  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    User.push({ username, password });
    res.status(200).json({ message: "User added successfully" });
  }
});

// delete any user by username
app.delete("/delete/:username", (req, res) => {
  const { username } = req.params;
  const user = User.find((user) => user.username === username);
  if (user) {
    User = User.filter((user) => user.username !== username); // remove user from User
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// update user's username and password by username
app.patch("/update/:username", (req, res) => {
  const { username } = req.params;
  const { name, password } = req.body;
  const user = User.find((user) => user.username === username);
  if (user) {
    user.username = name; // update user username
    user.password = password; // update user password
    res.status(200).json({ message: "User updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
