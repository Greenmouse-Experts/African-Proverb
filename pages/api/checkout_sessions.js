import { PLANS } from "@/utils/stripeConfig";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")("sk_test_51OAJJHEkIbgL8b7IGSkEUZ9KQ2hk6GDNixMRT0ntBX76VjpuDfD0wLIHi2slLtkwTkVqAISNAKLZSJQMD8FAwTFZ00T5GPICcA");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { duration, name } = req.query;
    const prince_id = PLANS.find(
      (plan) => plan.name === name && plan.type === duration
    )?.price_id;
    if (!duration && !name) res.status(404).json({ message: "Bad Request" });
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: prince_id, quantity: 1 }],
        mode: duration,
        success_url: `${req.headers.origin}/profile?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/profile?canceled=true`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
