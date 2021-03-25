const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  console.log(req.body);
  console.log("The export signup is successfuly linked");
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        widgets: [],
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.OAuthLogin = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user)
      if (!user) {
        bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
            widgets: [],
          });
          user
            .save()
            .then(() => res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            }))
            .catch((error) => console.log(error) ?? res.status(400).json({ error }));
        })
        .catch((error) => console.log(error) ?? res.status(500).json({ error }));
      } else {
        bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    }})
      .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log(res.status);
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.widget = (req, res, next) => {
  console.log("Still trying to create a new widget in the database");
  console.log(req.body);
  User.findById(req.body.userId).then((user) => {
    console.log(user);
    const newWidget = {
      widget: req.body.widget,
      parameters: req.body.parameters,
    };
    console.log("hello");
    console.log(user.widgets.push(newWidget));
    user.save();
  });
  res.status(200);
};

exports.getWidgets = (req, res, next) => {
  User.findById(req.body.userId)
    .then((user) => res.status(200).json({ widgets: user.widgets ?? [] }))
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyWidgets = (req, res, next) => {
  User.updateOne({ _id: req.parameters.widget }, { ...widget })
    .then(() =>
      res.status(200).json({ message: "The widget has been modified!" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteWidget = (req, res, next) => {
  console.log("DeleteWidget");
  const { userId, index } = req.body;

  if (typeof index !== "number") {
    return res.status(400).json({ message: "Index must be a number" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Unknown user" });
      }
      const widgets = [...user.widgets];
      if (index > widgets.length - 1) {
        throw "Invalid index";
      }
      widgets.splice(index, 1);
      user.widgets = widgets;
      return user.save();
    })
    .then((user) =>
      res
        .status(200)
        .json({ widgets: user.widgets, message: "Widget well removed" })
    )
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};