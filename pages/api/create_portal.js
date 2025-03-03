import { PLANS } from "@/utils/stripeConfig";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51OAJJHEkIbgL8b7IGSkEUZ9KQ2hk6GDNixMRT0ntBX76VjpuDfD0wLIHi2slLtkwTkVqAISNAKLZSJQMD8FAwTFZ00T5GPICcA"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { session_id } = req.query;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const returnUrl = `${req.headers.origin}/profile`;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    res.status(200).json({ url: portalSession.url });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
