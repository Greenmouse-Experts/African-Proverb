import FooterStyles from "../../styles/Footer.module.scss";
import Logo from "../../public/icon/whitelogo.svg";
import { footerData } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={FooterStyles.footercontainer}>
      <div className={FooterStyles.footercontainerinner}>
        <div className={FooterStyles.footertop}>
          <div className={FooterStyles.footerleft}>
            <Image
              src={Logo}
              alt="African Proverb Logo"
              width={171.83}
              height={66}
            />
            <p>Wisdom from the motherland, at your fingertips.</p>
          </div>

          {footerData.map((item) => {
            return (
              <div className={FooterStyles["footer-content"]} key={item.id}>
                <h1>{item.header}</h1>
                <ul>
                  {item.links.map(([label, href], index) => (
                    <Link target="_blank" href={href} key={index}>
                      <li className="cursor-pointer">{label}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
