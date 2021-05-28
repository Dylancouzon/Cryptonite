const router = require('express').Router();
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.post('/charge', async (req, res) => {
  const { id, amount } = req.body;
  
  try {
    const payment = await Stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Something here', //pass in the label message here?
      payment_method: id,
      confirm: true
    });

    console.log(payment);
    return res.status(200).json({
      confirm: "transaction was successful"
    });
  } catch(err) {
    res.status(400).json({ message: "transaction failed" });
  }
})

module.exports = router;