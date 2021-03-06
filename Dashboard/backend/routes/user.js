const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/OAuthLogin", userCtrl.OAuthLogin);
router.post("/widget", authMiddleware, userCtrl.widget);
router.get("/widgets", authMiddleware, userCtrl.getWidgets);
router.post("/widgetDeleteWidget", authMiddleware, userCtrl.deleteWidget);
router.post("/sendEmail", userCtrl.sendEmail);
module.exports = router;
