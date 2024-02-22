const rzp = require("../utils/razorpayy")
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

const generateRandom = () =>{
    return uuidv4();
}
const PlaceOrders = async(req , res) => {
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: generateRandom(),
        payment_capture: 1
    };
    try {
        const response = await rzp.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
        // return res.status(200).json(response)
    } catch (err) {
       return res.status(400).send('Not able to create order. Please try again!');
    }
}

const secret_key = process.env.RAZOR_HASH_KEY;

const paymentCaptures = async(req, res) => {

const data = crypto.createHmac('sha256', secret_key)

   data.update(JSON.stringify(req.body))

   const digest = data.digest('hex')

    if (digest === req.headers['x-razorpay-signature']) {

        console.log('request is legit')

        //We can send the response and store information in a database.

        res.json({

            status: 'ok'

        })

    } else {

        res.status(400).send('Invalid signature');

    }

}

const PaymentRefund = async (req, res) => {

    try {
 
        //Verify the payment Id first, then access the Razorpay API.
 
        const options = {
 
            payment_id: req.body.paymentId,
 
            amount: req.body.amount,
 
        };
 
    const razorpayResponse = await razorpay.refund(options);
 
        //We can send the response and store information in a database
 
        return res.send('Successfully refunded')
 
    } catch (error) {
 
        console.log(error);
 
        return res.status(400).send('unable to issue a refund');
 
    }
 
 }

module.exports = {
    PlaceOrders,
    paymentCaptures,
    PaymentRefund
}