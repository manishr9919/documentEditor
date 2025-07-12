const express = require("express");
const app = express();
require("dotenv").config({ debug: false });
const port = process.env.PORT || 5000;
const cors = require("cors");
const loginRotes = require("./src/Route/user.login");
const signupRoutes = require("./src/Route/user.signup");
const connection = require("./config/db");
const DocumentRoutes=require("./src/Route/document.routes")
app.use(cors());
app.use(express.json());
// this is text Routes
app.use("/signup", signupRoutes);
app.use("/signin", loginRotes);
app.use("/documents", DocumentRoutes);

app.get("/", (_, res) => {
  res.send("hello");
});

app.listen(port, () => {
  connection();
  console.log(`server started on port  ${port}`);
});
