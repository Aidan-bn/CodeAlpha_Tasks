const home = (req, res) => {
  res.send("This is the home page bro");
}

const userLogin = (req, res) => {
  res.send("These are user routes");
}

export {
  home,
  userLogin
};