const path = require("path");
const express = require("express");
const Product = require("./models/Product");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
const stripe = require("stripe")(process.env.CLIENT_SECRET);
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  // cors: "http://localhost:3001",
  cors: "https://itshop-sklep.herokuapp.com:8080",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/images", imageRoutes);

const dirname = path.resolve();
app.use(express.static(path.join(dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

server.listen(process.env.PORT, () => {
  console.log("server running at port", process.env.PORT);
});

app.set("socketio", io);
