import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ActivateAccount } from "@/network/authService";
import Loader from "@/components/reuse/loader";
import { toast } from "react-toastify";
import Image from "next/image";
import SuccessIcon from "@/public/img/success-icon.png";
import Link from "next/link";
import AuthHeader from "@/components/auth/auth_header";

const Activate = () => {
  const router = useRouter();
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { email, userId } = router.query;
  const phone = decodeURIComponent(router.query.phone || '').replace(/ /g, '+');


  
  const handleSubmit = (e) => {
    setError(null);
    setIsLoading(true);

    if (email && userId && phone) {
      ActivateAccount({
        email: email,
        userId: userId,
        phone: phone,
      })
        .then((res) => {
          setActivated(true);
          setIsLoading(false);
          // console.log(res);
        })
        .catch((error) => {
          // console.log(error);
          setIsLoading(false);
          setError(error.response.data.data.message);
          // toast.error(error.response.data.data.message);
        });
    } else {
      setError("An Error occured during activation, please contact support");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [email, phone, userId]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  const CONTAINERSTYLE = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const CARDSTYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "2rem",
    width: "100%",
    maxWidth: "500px",
    height: "400px",
    backgroundColor: "rgba(255,255,255)",
    borderRadius: "20px",
  };

  const LINKSTYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#BB5D06",
    color: "#fff",
    padding: "15px",
    cursor: "pointer",
  };

  // return <>{activated && <div>Activate</div>}</>;
  return (
    <>
      <div style={CONTAINERSTYLE}>
        {activated ? (
          <div style={CARDSTYLE}>
            <Image src={SuccessIcon} alt="Success Icon" />

            <p>Email Activated Successfully </p>
            <Link style={LINKSTYLE} href={"/auth/login"}>
              Proceed To Login
            </Link>
          </div>
        ) : (
          <div style={CARDSTYLE}>
            <AuthHeader headerText="" />
            <p>{error}</p>
            <Link style={LINKSTYLE} href={"/"}>
              Back Home
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Activate;
