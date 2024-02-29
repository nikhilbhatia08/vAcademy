const Razorpay = require("razorpay")

const rzp = new Razorpay({
    key_id: 's',//process.env.RAZOR__KEY_ID,
    key_secret: 's',//process.env.RAZOR__KEY_SECRET,
})

module.exports = rzp;