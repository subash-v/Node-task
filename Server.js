const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const taskRoutes = require("./routes/taskRoute");
//middleware aap.use

app.use((req, res, next) => {
  console.log("Path " + req.path + " method " + req.method);
  next();
});
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `DB Connected successfully and listening to ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log("Error" + err));

app.use("/api/tasks", taskRoutes);
app.use("/api/tasks", taskRoutes);
