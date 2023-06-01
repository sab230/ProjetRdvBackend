const express = require('express');
const app = express();
const user = require('./user.json');

app.use(express.json());

app.get('/user', (req, res) => {
  res.status(200).json(user);
  res.status(200).json({ message: "User list" });
});

app.post('/user', (req, res) => {
  let newUser = req.body;
  if (newUser) {
    newUser.id = user.length + 1;
    user.push(newUser);
    res.status(201).json(user);
  } else {
    res.status(400).json({ message: "Invalid user" });
  }
});

app.get('/user/:id', (req, res) => {
  let id = req.params.id;
  let foundUser = user.find(u => u.id == id);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Le serveur est en écoute sur le port 3000');
});
