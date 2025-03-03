import AuthLayout from "@/components/reuse/auth_Layout";
import React from "react";
import DottedLine from "../public/img/dottedline.png";
import Image from "next/image";
import Typewriter from "typewriter-effect";
const ComingSoon = () => {
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(211, 211, 211, 0.2)",
  };

  const mainDivStyle = {
    backgroundImage: `url(/img/comingsoonbackground.png)`,
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    height: "100%",
    width: "100%",
  };
  const contentStyle = {
    backgroundImage: `url(/img/tornpaper.png)`,
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    minHeight: "30vh",
    height: "100%",
    width: "100%",
    maxWidth: "500px",
    color: "#BB5D06",
    zIndex: "200",
  };
  return (
    <AuthLayout>
      <div
        style={mainDivStyle}
        className="flex justify-center items-center flex-col w-full h-full p-5"
      >
        {/* <div style={overlayStyle}></div> */}

        <div
          style={contentStyle}
          className="flex flex-col justify-center items-center"
        >
          <p className="text-sm mb-2">www.africanproverbs.com</p>
          <Image
            className="mb-5"
            height={10}
            width={300}
            src={DottedLine}
            alt={"African Proverb Logo"}
          ></Image>
          <h1 className="md:text-2xl lg:text-4xl font-bold">
            <Typewriter
              options={{
                strings: ["Coming Soon ..."],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <Image
            className="mt-5"
            height={20}
            width={300}
            src={DottedLine}
            alt={"African Proverb Logo"}
          ></Image>
          <h3 className="text-xl mt-5">Watch this space!</h3>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ComingSoon;
