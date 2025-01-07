import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const friends = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/getCurrentDate", (req, res) => {
  const date = new Date();
  res.json({ currentDate: date });
});

app.post("/addFriends", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const friend = {
    name: name,
    email: email,
    age: age,
  };
  friends.push(friend);
  res.json({ friends: friends });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
