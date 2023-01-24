require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr =
  "mongodb+srv://admin:grzyb123@cluster0.2pxasg0.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
