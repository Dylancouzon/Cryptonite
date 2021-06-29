const router = require('express').Router();
require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

router.post('/charge', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Something here', //we need to pass in these fields from client
      payment_method: id,
      confirm: true
    })
    // console.log(payment); // view payment info captured from client

      .then((results) => {
        console.log(results); // view response of API call to Stripe
        return res.status(200).json({
          message: "Transaction was succesfully sent to Stripe.",
          status: results.status
        });
      })

      .catch((err) => {
        console.log(err) // view err of API call to Stripe
        res.status(400).json({
          message: "something went wrong",
          error: err.code
        })
      });

  } catch (err) {
    console.log(err) // view error if API call to Stripe failed
    return res.status(400).json({
      message: "Transaction failed to send to Stripe.",
      status: results.status
    });
  }
})

module.exports = router;