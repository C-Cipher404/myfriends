import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const friends = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/getCurrentDate", (req, res) => {
  const date = new Date();
  res.json({ currentDate: date.toDateString() });
});
app.get("/getCurrentTime", (req, res) => {
  const time = new Date();
  res.json({ currentTime: time.toTimeString() });
});
app.get("/getActivity", (req, res) => {
  res.json({ activity: "Playing games" });
});
app.prototype("/addActivity", (req, res) => {
  const { activity } = req.body;
  if (!activity) {
    return res
      .status(400)
      .json({ success: false, message: "Activity is required!" });
  }
  res.json({ success: true, activity });
});

app.post("/addFriend", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required!" });
  }

  const friend = { name, email, age };
  friends.push(friend);

  res.json({ success: true, friends: friends });
});

app.get("/searchFriend", (req, res) => {
  const email = req.query.email;

  const friend = friends.find((f) => f.email === email);

  if (friend) {
    res.json({ success: true, friend });
  } else {
    res.json({ success: false, message: "Friend not found!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
