import BgImg1 from "../public/img/hero1.png";
import BgImg2 from "../public/img/hero2.png";

export const footerData = [
  {
    id: 1,
    header: "Social Media",
    list: ["Instagram", "Twitter", "Threads", "Instagram"],
    links: [
      ["Instagram", "https://www.instagram.com/africanproverbsdotcom/"],
      ["Twitter", "https://twitter.com/africproverbs"],
      ["Threads", "https://www.threads.net/@africanproverbsdotcom"],
    ],
  },

  {
    id: 2,
    header: "Quick Links",
    list: ["Home", "About", "Proverbs", "Privacy Policy"],
    links: [
      ["Home", "/"],
      ["About", "about/"],
      ["Proverbs", "search_result/"],
      ["Privacy Policy", "privacy_policy/"],

      ["", ""],
    ],
  },
  {
    id: 3,
    header: "Contact Us",
    links: [
      ["118b, Ilupeju way, Dolphin estate, Ikoyi lagos", ""],
      ["contact@calmglobal.com", "mailto:contact@calmglobal.com"],
      ["+2348107536218", ""],
      ["", ""],
    ],
  },
];

export const HomeBackgroundData = [
  {
    url: BgImg1.src,
    id: 1,
  },
  {
    url: BgImg2.src,
    id: 2,
  },
];
