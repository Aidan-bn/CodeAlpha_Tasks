const express = require("express");
const router = express.Router();
const {
  home,
  allUsers,
  singleUser,
  createUser,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/userController");

router.get("/", home);
router.get("/users", allUsers);
router.get("/user/:id", singleUser);
router.post("/createUser", createUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/update/:id", updateUser);
router.post("/login", login);

module.exports = router;
