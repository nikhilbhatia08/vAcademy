const Razorpay = require("razorpay")

const rzp = new Razorpay({
    key_id: process.env.RAZOR__KEY_ID,
    key_secret: process.env.RAZOR__KEY_SECRET,
})

module.exports = rzp;