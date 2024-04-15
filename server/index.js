const express = require("express");
const cors = require("cors");
//app
const app = express();

//middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

app.listen(8000, () => {
  console.log("SERVER at port 8000 is running");
});
