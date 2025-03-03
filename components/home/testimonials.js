import React from "react";
import TestimonialStyles from "../../styles/Testimonials.module.scss";
import SectionHeader from "../reuse/section_header";
import TestimonialCard from "../reuse/testimonial_card";
import Bukky from "../../public/img/bukky.jpeg"
import Wole from "../../public/img/wole.jpeg"
import Juwon from "../../public/img/juwon.jpeg"

const Testimonials = () => {
  return (
    <div>
      <SectionHeader header="Testimonials" />
      <div className={TestimonialStyles["testimonial-container"]}>
       
        <TestimonialCard
          image={Bukky}
          name="Olowoyo Bukola"
          address="Lagos, Nigeria"
          text="This website offers a vast and diverse collection of African proverbs that provide unique insights into the culture and values of the continent. I've learned so much from it."
        />
        <TestimonialCard
          image={Juwon}
          name="Abiodun Oluwajuwon"
          address="Ikoyi, Lagos Nigeria"
          text="As someone who loves using African proverbs in my writing and speaking, this website has been invaluable. It offers organized proverbs by themes and includes background information and explanations for each proverb."
        />
         <TestimonialCard
          image={Wole}
          name="Akorede Olawole"
          address="Ibadan, Oyo Nigeria"
          text="Thanks to this website, I've gained a new perspective on life by understanding and appreciating the wisdom of African proverbs. It's easy to explore and discover new proverbs."
        />
      </div>
    </div>
  );
};

export default Testimonials;
