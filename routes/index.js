// *** Include Modules: npm (path, express), /api
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// Send all other requests to React
router.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
