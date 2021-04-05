const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { json } = require("body-parser");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const path = require("path");

let email_destinataire;
let email_expediteur;
let objet;
let email;

// If modifying these scopes, delete token.json.
var SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.metadata",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

function authorize(credentials, callback) {
  console.log(credentials);
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

exports.sendEmail = (req, res, next) => {
  // const auth = authenticate({
  //   keyfilePath: path.join(__dirname, "../secret_google.json"),
  //   scopes: [
  //     "https://mail.google.com/",
  //     "https://www.googleapis.com/auth/gmail.modify",
  //     "https://www.googleapis.com/auth/gmail.compose",
  //     "https://www.googleapis.com/auth/gmail.send",
  //   ],
  // }).then((response) => {
  //   google.options({ response });
  email_destinataire = req.body.email_destinataire;
  email_expediteur = req.body.email_expediteur;
  objet = req.body.objet;
  email = req.body.email;
  fs.readFile("credentials.json", function processClientSecrets(err, content) {
    if (err) {
      console.log("Error loading client secret file: " + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    authorize(JSON.parse(content), sendMessage);
  });
  // sendMessage(req.body, res);
  //});
};

function makeBody(to, from, subject, message) {
  var str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    to,
    "\n",
    "from: ",
    from,
    "\n",
    "subject: ",
    subject,
    "\n\n",
    message,
  ].join("");
  console.log("str =", str);

  var encodedMail = new Buffer(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return encodedMail;
}

function sendMessage(auth) {
  var raw = makeBody(email_destinataire, email_expediteur, objet, email);
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: raw,
    },
  });
}

exports.getInstagramAuth = (req, res, next) => {
  console.log("FUNCTION GOOGLE");
  var code = req.body.code;
  console.log("Le code d'url de Google est=", code);
  console.log("ICI");
  fetch("https://oauth2.googleapis.com/token", {
    method: "post",
    body: JSON.stringify({
      client_id:
        "802177880418-n2tvfud966k8preldun4c97o5sdh7s3h.apps.googleusercontent.com",
      client_secret: "ml_mZkqN6N4Cc5FCKiCgYsEm",
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8080",
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => console.log(error) ?? res.status(400).json(error));
};

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
      console.log(user);
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
              .then(() =>
                res.status(200).json({
                  userId: user._id,
                  token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                  }),
                })
              )
              .catch(
                (error) => console.log(error) ?? res.status(400).json({ error })
              );
          })
          .catch(
            (error) => console.log(error) ?? res.status(500).json({ error })
          );
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
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
