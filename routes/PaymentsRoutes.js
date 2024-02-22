const express = require("express");
const router = express.Router();
const {PlaceOrders , paymentCaptures , PaymentRefund} = require("../controller/PlaceOrder")

router
    .post("/PlaceOrder" , PlaceOrders)
    .post('/paymentCapture' , paymentCaptures)
    .post('/refund' , PaymentRefund)

module.exports = router;