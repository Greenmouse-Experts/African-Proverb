import Image from "next/image";
import React from "react";
import TestimonialcardStyles from "../../styles/Testimonialcard.module.scss";
import Star from "../../public/icon/star.svg";

const TestimonialCard = ({ image, name, address, text }) => {
  return (
    <div className={TestimonialcardStyles["card-container"]}>
      <p>{text}</p>

      <section className={TestimonialcardStyles["rating-image"]}>
        <div className={TestimonialcardStyles["testimonial-ratings"]}>
          <Image src={Star} alt="star rating signs" />
          <Image src={Star} alt="star rating signs" />
          <Image src={Star} alt="star rating signs" />
          <Image src={Star} alt="star rating signs" />
          <Image src={Star} alt="star rating signs" />
        </div>

        <div className={TestimonialcardStyles["testimonial-footer"]}>
          <Image height={"auto"} width={"auto"} src={image} alt={`${name} image`} />
          <span>
            <h3>{name}</h3>
            <p>{address}</p>
          </span>
        </div>
      </section>
    </div>
  );
};

export default TestimonialCard;
