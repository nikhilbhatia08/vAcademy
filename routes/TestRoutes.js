const express = require("express");
const router = express.Router();
const {Create_Test , Get_All_Tests , Selected_Test , send_results , LeaderBoard , completedTests, create_Test_With_Excel} = require("../controller/CreateTestController");
const upload = require("../MiddleWares.js/Multerr");
router
    .post("/createTest" , Create_Test)
    .post("/createTestWithExcel", upload.any(), create_Test_With_Excel)
    .get("/activeTests" , Get_All_Tests)
    .get("/currTest/:id" , Selected_Test)
    .post("/sendResults/:id" , send_results)
    .get("/LeaderBoard/:ldrBrd" , LeaderBoard)
    .get("/expiredTests" , completedTests)

module.exports = router