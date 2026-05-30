const express = require("express");
const app = express();
const client = require("../pg");

const home = (req, res) => {
  res.send("Hello there");
};

//get all users
const allUsers = async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.json({ message: "Error fetching data", error });
  }
  //res.send("I am an app for you try"); developer saveus2020
};

//get a single user by ID
const singleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
  //res.send("A single user");
};

const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const results = await client.query(
      "INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, password],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.json({ message: "Error in user creation" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  try {
    await client.query(
      "UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4",
      [name, email, phone, id],
    );
    res.status(200).json({ message: `user ${id} updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error upadating user" });
  }
  //res.send("Tryinging to update a user now");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await client.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: `User with ID deleted: ${id}` });
  } catch (error) {
    console.error();
  }
  res.status(500).json({ message: "One record deleted" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1 AND password=$2",
      [email, password],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login succeful",
      user: result.rows[0],
      location: "/index.html",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

module.exports = {
  home,
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
