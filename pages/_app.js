import MultiStepContext from "@/context/StepContext";
import "@/styles/globals.css";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EthnicProvider from "@/context/providers/ethnicProvider";
import AdsProvider from "@/context/providers/adsProvider";
import PackageProvider from "@/context/providers/packageProvider";
import AuthProvider from "@/context/providers/authProvider";
import UserNotificationProvider from "@/context/providers/userNotificationProvider";
import VerifyUserProvider from "@/context/providers/verifyUserProvider";
import ApiProvider from "@/context/providers/apiProvider";
import ProfileProvider from "@/context/providers/profileProvider";
import ProtectedPages from "@/components/auth/protected_pages";
import PaymentProvider from "@/context/providers/paymentProvider";
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging } from "@/utils/firebase";
import QuizProvider from "@/context/providers/quizProvider";
import { ConfigProvider } from "antd";

import CustomAds from "@/components/customads";

export default function App({ Component, pageProps }) {
  const [currentStep, setStep] = useState(1);

  const [finalData, setFinalData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [registrationSuccessModal, setRegistrationSuccessModal] =
    useState(false);
  useState(false);
  function submitData(e) {
    e.preventDefault();
  }

  useEffect(() => {
    setToken();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
          function (registration) {
            // Registration was successful
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          function (err) {
            // registration failed :(
            console.error("ServiceWorker registration failed: ", err);
          }
        );
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Handles the click function on the toast showing push notification
    const handleClickPushNotification = (url) => { };

    function getMessage() {
      firebase.messaging().onMessage((message) => {
        toast(
          <div onClick={() => handleClickPushNotification(message?.data?.url)}>
            <h5>{message?.notification?.title}</h5>
            <h6>{message?.notification?.body}</h6>
          </div>,
          {
            closeOnClick: false,
          }
        );
      });
    }
  });

  return (
    // <PayPalScriptProvider
    //   options={{
    //     clientId:
    //       "AQBLWFHdKTQ2yoEsTOlGsUIaXI4rDXQS8lDn4udPsKYzHn7D84iSY-yoI3eJimM9Sc4zVnqI7CpoRDGf",
    //     components: "buttons",
    //     currency: "USD",
    //   }}
    // >
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            /* here is your component tokens */
            // contentBg: "#fff",
            contentBg: "#0E0906",
            algorithm: true,
          },
        },
      }}
    >


     
      <MultiStepContext.Provider
        value={{
          currentStep,
          setStep,
          setSelectedLanguage,
          selectedLanguage,
          setSelectedLanguages,
          selectedLanguages,
          finalData,
          setFinalData,
          submitData,
          setRegistrationSuccessModal,
          registrationSuccessModal,
        }}
      >



        <AuthProvider>
          <ApiProvider>
            <QuizProvider>
              <PaymentProvider>
                <ProfileProvider>
                  <UserNotificationProvider>
                    <VerifyUserProvider>
                      <EthnicProvider>
                        <AdsProvider>
                          <PackageProvider>
                            <ProtectedPages>
                              <Component {...pageProps} />
                            </ProtectedPages>
                          </PackageProvider>
                        </AdsProvider>
                      </EthnicProvider>
                    </VerifyUserProvider>
                  </UserNotificationProvider>
                </ProfileProvider>
                <ToastContainer position="top-left" />
              </PaymentProvider>
            </QuizProvider>
          </ApiProvider>
        </AuthProvider>
      </MultiStepContext.Provider>
    </ConfigProvider>

    // </PayPalScriptProvider>
  );
}
