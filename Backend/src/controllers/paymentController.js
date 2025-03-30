exports.payWithStripe = async (req, res) => {
    const { amount, currency } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe Unit (cent)
        currency: currency || 'usd',
        payment_method_types: ['card']
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ message: 'Stripe Payment Error', error });
    }
  };
  