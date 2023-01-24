const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
// signup

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send("Email już istnieje");
    res.status(400).send(e.message);
  }
});

router.put("/setadmin", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  const user = await User.findById(id);
  if (user) {
    user.isAdmin = !Boolean(user.isAdmin);
    const updatedUser = await user.save();
    res.json({ message: "Konto zaktualizowane!", user: updatedUser });
  } else {
    res.status(404).send({ message: "Konto admina nieznalezione!" });
  }
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get users;

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    console.log(req.body);
    const users = await User.find({ email: { $ne: email } }).populate("orders");
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get user orders

router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// update user notifcations
router.post("/:id/updateNotifications", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.notifications.forEach((notif) => {
      notif.status = "read";
    });
    user.markModified("notifications");
    await user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
