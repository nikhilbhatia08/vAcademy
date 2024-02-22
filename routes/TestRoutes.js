const express = require("express");
const router = express.Router();
const {Create_Test , Get_All_Tests , Selected_Test , send_results , LeaderBoard , completedTests} = require("../controller/CreateTestController")
router
    .post("/createTest" , Create_Test)
    .get("/activeTests" , Get_All_Tests)
    .get("/currTest/:id" , Selected_Test)
    .post("/sendResults/:id" , send_results)
    .get("/LeaderBoard/:ldrBrd" , LeaderBoard)
    .get("/expiredTests" , completedTests)

module.exports = router