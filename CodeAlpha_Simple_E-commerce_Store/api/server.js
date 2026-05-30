const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const router = require("./routes/routes");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
const pg = require('pg');

app.use('/api', router);

// app.post("/login", (req, res) => {
//   let name = req.body.user - name + "" + req.body.password;
//   res.send(name + "Submitted Successfully");
// });

app.listen(8080, () => {
  console.log("server started");
});
