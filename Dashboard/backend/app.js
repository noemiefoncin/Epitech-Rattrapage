const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const controller = require("./controllers/user");

const userRoutes = require("./routes/user");
const aboutRoutes = require("./routes/about");

mongoose
  .connect(
    "mongodb+srv://passworddashboard:passworddashboard@dashboard.qlci4.mongodb.net/Database?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //accéder à l'api depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //ajouter les headers mentionnés aux requêtes envoyées vers notre api
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  //envoyer des requêtes avec les méthodes mentionnées (GET,POST...)
  next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/auth/google", controller.getInstagramAuth);
app.use("/about.json", aboutRoutes);

module.exports = app;
