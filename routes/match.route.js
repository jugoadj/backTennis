const router = require("express").Router();
const matchController = require("../controllers/match.controller");


router.post("/calculate-score", matchController.CalculateScore);



module.exports = router;
