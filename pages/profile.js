import { useContext, useEffect, useState } from "react";
import AuthLayout from "@/components/reuse/auth_Layout";
import Loader from "@/components/reuse/loader";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import ModalDialogue from "@/components/update-subscription/ModalDialogue";
import { ProfileContext } from "@/context/profileContext";
import SuccessIcon from "@/public/img/success-icon.png";
import ProfileStyles from "@/styles/Profile.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import CustomAds from "@/components/customads";
import UpgradeSubLag from "@/components/UpgradeSubLang";
import Header from "@/components/profile/Header";
import { AuthContext } from "@/context/authContext";
import AddressInfo from "@/components/profile/AddressInfo";
import FavouriteProverbs from "@/components/profile/FavouriteProverbs";
import PersonalAndContactHeader from "@/components/profile/PersonalAndContactHeader";
import PersonalInfo from "@/components/profile/PersonalInfo";
import ProfileDetails from "@/components/profile/ProfileDetails";
import InstantQuiz from "@/components/quiz/GenerateInstantQuiz"

const Profile = () => {
  const {
    personalInfo,
    address,
    error,
    fullDetails,
    loading,
    favoriteProverbs,
    state,
    getAllData,
  } = useContext(ProfileContext);

  const [subscriptionCancelSuccess, setSubscriptionCancelSuccess] =
    useState(false);
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const baseUrl = process.env.BASE_URL;
  const [selectedPlan, setselectedPlan] = useState(null);
  const [updateSubModalOne, setupdateSubModalOne] = useState(false);
  const [openQuizModal, setOpenQuizModal] = useState(false);

  const [sessionExipreError, setSessionExipreError] = useState(false);
  const [toggleUserInfo, settoggleUserInfo] = useState("contact-info");
  const [currentPlan, setcurrentPlan] = useState({
    title: "Bronze",
    price: "100",
  });
  const [newPlan, setnewPlan] = useState([
    { title: "Silver", price: "200" },
    { title: "Gold", price: "300" },
    { title: "Platinum", price: "400" },
  ]);

  useEffect(() => {
    if (error && error.response?.status === 401) {
      setSessionExipreError(true);
    }
  }, [error]);

  useEffect(() => {
    getAllData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  function handleRenewalCanceled() {
    setCancelSubscription(false);
    setSubscriptionCancelSuccess(true);
  }

  function handleSelectPlan(event, plan) {
    setselectedPlan(plan);
  }

  if (!isAuthenticated) {
    return (
      <ReusableModal open={sessionExipreError} setOpen={setSessionExipreError}>
        <p className="text-2xl font-semibold text-gray-600">
          Your session has expired
        </p>
        <Link
          href={`/auth/login/`}
          className="px-8 py-2 rounded-md bg-[#BB5D06] text-white flex items-center justify-center gap-1 mt-8"
        >
          Go to login <BsArrowRight />{" "}
        </Link>
      </ReusableModal>
    );
  }

  return (
    <AuthLayout>
      <div className={ProfileStyles["main-container"]}>
        <ReusableModal
          setOpen={setCancelSubscription}
          open={cancelSubscription}
        >
          <motion.div
            className="p-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="text-lg mb-3">Cancel Subscription Renewal</h4>
            <hr className="text-2xl text-gray-600" />
            <div className="text-center">
              <p className="text-sm font-bold my-4">
                Are you sure you want to cancel <br /> subscription
                auto-renewal?
              </p>
              <div className="flex gap-2 items-center justify-center">
                <button
                  onClick={() => setCancelSubscription(false)}
                  className="p-3 border border-[#FF0000] rounded-md text-[#FF0000]"
                >
                  Don't Cancel
                </button>
                <button
                  onClick={handleRenewalCanceled}
                  className="text-white rounded-md bg-[#FF0000] p-3"
                >
                  Cancel Renewal
                </button>
              </div>
            </div>
          </motion.div>
        </ReusableModal>
        <ReusableModal
          open={subscriptionCancelSuccess}
          setOpen={setSubscriptionCancelSuccess}
        >
          <div className="flex flex-col justify-center items-center space-y-4">
            <Image
              src={SuccessIcon}
              width={80}
              height={80}
              alt="Success Icon"
            />
            <p className="text-sm font-semibold">
              Auto renewal has been successfully canceled.
            </p>
            <Link href={"/"}>
              <button className="flex gap-2 items-center justify-center shadow-lg bg-[#BB5D06] px-4 py-3 rounded-md text-white">
                Go to Manage Subscription{" "}
                <BsArrowRight className="text-xl mt-1" />
              </button>
            </Link>
          </div>
        </ReusableModal>

        <ReusableModal
          open={openQuizModal}
          setOpen={setOpenQuizModal}
        >
          <InstantQuiz />
        </ReusableModal>

        <div className={ProfileStyles["profile-conatiner"]}>
          <Header setOpen={setOpenQuizModal} />
          <ProfileDetails
            personalInfo={personalInfo}
            fullDetails={fullDetails}
            setupdateSubModalOne={setupdateSubModalOne}
          />
        </div>

        <div className={ProfileStyles["user-details-container"]}>
          <div className={ProfileStyles["personal-info"]}>
            <div className="flex flex-col gap-1">
              <PersonalAndContactHeader
                toggleUserInfo={toggleUserInfo}
                settoggleUserInfo={settoggleUserInfo}
              />
            </div>

            <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-y-8 mt-8">
              {toggleUserInfo === "contact-info" ? (
                <PersonalInfo personalInfo={personalInfo} />
              ) : (
                <AddressInfo address={address} />
              )}
            </div>
          </div>

          <div className={ProfileStyles["address"]}>
            <UpgradeSubLag fullDetails={fullDetails} />
          </div>
        </div>
        {favoriteProverbs?.data.length > 0 && (
          <div className={ProfileStyles["favourite-proverbs-container"]}>
            <FavouriteProverbs proverbs={favoriteProverbs} />
          </div>
        )}

        {/* Update subscription Modals */}
        {updateSubModalOne && (
          <ReusableModal
            open={updateSubModalOne}
            setOpen={setupdateSubModalOne}
          >
            <ModalDialogue />
          </ReusableModal>
        )}
      </div>
      <CustomAds />
    </AuthLayout>
  );
};

export default Profile;
