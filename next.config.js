/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  env: {
    BASE_URL: "https://api.african-proverbs.greenmouseonline.com/munaapi",
   // BASE_URL: "https://api.africanproverbs.com/munaapi",
    // BASE_URL: "https://dev-api.africanproverbs.com/munaapi",
    NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID:"ca-pub-8847725878665598",
    PAYSTACK_PUBLIC_KEY: "pk_test_d8e9f0b509782f029f31ef7e375a26dbbeaf32c7",
    
    STRIPE_SECRET_KEY:
      "sk_test_51OAJJHEkIbgL8b7IGSkEUZ9KQ2hk6GDNixMRT0ntBX76VjpuDfD0wLIHi2slLtkwTkVqAISNAKLZSJQMD8FAwTFZ00T5GPICcA",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      "pk_test_51OAJJHEkIbgL8b7IscCWgbZmgGV1IKGoGsQeIXz9joAnNDVyflPO05P8TqD49a70JwE8FNSDpshifqXIxZsdBMb700EqoFqdvE",
  },
};

module.exports = nextConfig;
