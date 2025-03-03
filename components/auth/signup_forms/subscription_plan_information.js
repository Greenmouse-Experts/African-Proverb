import ReusableTextField from "@/components/reuse/textfield";
import Link from "next/link";
import styles from "@/styles/Signup.module.scss";
import SelectDropdown from "@/components/reuse/selectDropdown";
import MultipleSelect from "@/components/reuse/multiple_select";
import { useContext, useEffect, useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { EthnicContext } from "@/context/ethnicContext";
import { PackageContext } from "@/context/packageContext";
import {
  extractNameById,
  extractPackage,
  extractPackageDescription,
  extractPackageEthnicsNo,
} from "@/utils";
import SignUpSuccessModal from "@/components/reuse/signUpSuccessModal";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidLockAlt } from "react-icons/bi";
import { verifyPromoCode, verifyUser } from "@/network/apiService";
import { useRouter } from "next/router";
import BasicModal from "../signup_payment_modal";
import Button from "@/components/reuse/button";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import PaymentOptions from "@/components/payment/payment_option";
import GateWayPaymentButton from "@/components/paymentButton/paymentButton";
import PaymentBanner from "@/components/payment/paymentBanner";
import MultiStepContext from "@/context/StepContext";
import { PaymentContext } from "@/context/paymentContext";
import Logo from "@/public/icon/primarylogo.svg";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthHeader from "../auth_header";
import { ValidateRegistrationData } from "@/network/authService";
import { toast } from "react-toastify";

const SubscriptionPlanInformation = ({
  formik,
  paymentBannerOpen,
  setPaymentBannerOpen,
  registrationLoading,
}) => {
  const [preferredLanguage, setPreferredLanguage] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [description, setDescription] = useState("");
  const [maxLanguageSelections, setMaxLanguageSelections] = useState(5);
  const [promoCodeExists, setPromoCodeExists] = useState("");
  const [queryPromoCode, setQueryPromoCode] = useState("");
  const { ethnicsList } = useContext(EthnicContext);
  const { packageList } = useContext(PackageContext);
  const [userExists, setUserExists] = useState();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(true);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setPasswordConfirmVisible(!passwordConfirmVisible);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { selectedLanguages, setStep, finalData } =
    useContext(MultiStepContext);
  const { registerMetadata } = useContext(PaymentContext);
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    try {
      verifyUser(formik.values.email)
        .then((res) => setUserExists(false))
        .catch((err) => {
          setUserExists(true);
        });
    } catch (error) { }
  }, [formik.touched.email, formik.values.email]);

  const promoCodeValue = formik.values.promoCode || queryPromoCode;
  useEffect(() => {
    setQueryPromoCode(router.query.q);

    if (promoCodeValue && promoCodeValue.trim() !== "") {
      try {
        verifyPromoCode(formik.values.promoCode || queryPromoCode)
          .then((res) => setPromoCodeExists(res.data))

          .catch((err) => {
            if (err.response.data.success === "false") {
              // setPromoCodeExists(false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formik.touched.promoCode, formik.values.promoCode, queryPromoCode]);

  return (
    <div className="mt-[350px] pb-6">
      <AuthHeader headerText="Create an Account" />

      <div
        onClick={() => setStep(1)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginBottom: 30,
          cursor: "pointer",
          // color: "000",
        }}
      >
        <ArrowBackIcon sx={{ color: "#000" }} />
        <p style={{ color: "black" }}>Back</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <ReusableTextField
          id="email"
          name="email"
          icon="email"
          label="Email"
          type={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email && userExists}
        />
        {userExists && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            The email address you've entered is already in use. Please choose a
            different email address to proceed.
          </p>
        )}
        <ReusableTextField
          id="password1"
          icon="lock"
          label="Password"
          type={passwordVisible ? "password" : "text"}
          value={formik.values.password1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password1 && Boolean(formik.errors.password1)}
          helperText={formik.touched.password1 && formik.errors.password1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {<BiSolidLockAlt style={{ fontSize: "1.2rem" }} />}
              </InputAdornment>
            ),
            endAdornment: (
              <Box
                sx={{ cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </Box>
            ),
          }}
        />
        <ReusableTextField
          label="Confirm Password"
          type={passwordConfirmVisible ? "password" : "text"}
          id="password2"
          icon="lock"
          value={formik.values.password2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {<BiSolidLockAlt style={{ fontSize: "1.2rem" }} />}
              </InputAdornment>
            ),
            endAdornment: (
              <Box
                sx={{ cursor: "pointer" }}
                onClick={toggleConfirmPasswordVisibility}
              >
                {passwordConfirmVisible ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </Box>
            ),
          }}
        />
        <SelectDropdown
          label="Preferred Language"
          id="ethnics"
          name="ethnics"
          items={ethnicsList}
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
        // onBlur={formik.handleBlur}
        >
          {ethnicsList?.map((item, index) => {
            return (
              <MenuItem key={item.name} value={item}>
                {item.name}
              </MenuItem>
            );
          })}
        </SelectDropdown>

        {/* <SelectDropdown
          id="packageId"
          name="packageId"
          items={packageList}
          value={formik.values.packageId}
          helperText={formik.touched.packageId && formik.errors.packageId}
          onChange={(e) => {
            formik.handleChange(e);
            const selectedPackage = e.target.value;
            setSelectedPlan(extractPackage(packageList, selectedPackage));
            setSelectedSubscription(
              extractNameById(packageList, selectedPackage)
            );
            setMaxLanguageSelections(
              extractPackageEthnicsNo(packageList, selectedPackage)
            );
            setDescription(
              extractPackageDescription(packageList, selectedPackage)
            );
          }}
          onBlur={formik.handleBlur}
          label="Annual Subscription"
        >
          {packageList?.map((item, index) => {
            return (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </SelectDropdown>
        {formik.errors.packageId && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {formik.errors.packageId}
          </p>
        )} */}

        <MultipleSelect
          value={formik.values.ethnic}
          preferredLanguage={preferredLanguage}
          maxSelections={maxLanguageSelections}
        />

        {/* {<p className={styles["subscription-tags"]}>{description}</p>} */}

        <ReusableTextField
          icon="user"
          label="Promo Code"
          id="promoCode"
          name="promoCode"
          type={"text"}
          disabled={queryPromoCode}
          // value={formik.values.promoCode}
          value={formik.values.promoCode || queryPromoCode || null}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.promoCode && Boolean(formik.errors.promoCode)}
          helperText={formik.touched.promoCode && formik.errors.promoCode}
        />
        {!promoCodeExists && promoCodeValue && promoCodeValue.trim() !== "" && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            The promoCode you've entered does not exist.
          </p>
        )}


        <div style={{ margin: '1rem 0' }}>
          <input
            type="checkbox"
            id="consent"
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
          />

          <label htmlFor="consent" className="text-[#212121]" style={{ marginLeft: '0.5rem' }}>
            I agree to the
            <Link className=" text-[#BB5D06] ml-1" href="/privacy_policy">
              <span>Privacy Policy</span>
            </Link>
          </label>
        </div>

        <Button
          textInput={"Register"}
          isLoading={registrationLoading}
          disabled={
            registrationLoading ||
            Object.keys(formik.errors).length !== 0 ||
            formik.errors.email ||
            userExists ||
            formik.errors.password1 ||
            formik.errors.password2 ||
            // formik.errors.packageId ||
            (!promoCodeExists &&
              promoCodeValue &&
              promoCodeValue.trim() !== "") ||
            preferredLanguage.length === 0 ||
            !agreedToTerms
          }
          type="submit"
        // onClick={() => setPaymentBannerOpen(true)}
        // onClick={handleValidateData}
        />
        <ReusableModal open={paymentBannerOpen} setOpen={setPaymentBannerOpen}>
          {/* <ModalDialogue /> */}
          <PaymentBanner
            planObject={selectedPlan}
            selectedLanguages={selectedLanguages}
            preferredLanguageName={""}
          />
          <PaymentOptions />
          <GateWayPaymentButton planObject={selectedPlan} type={"register"} />
        </ReusableModal>

        <div style={{ display: "none" }}>
          <SignUpSuccessModal setPaymentBannerOpen={setPaymentBannerOpen} />
        </div>
        <p className={styles["signin-link"]}>
          Already have an account?{" "}
          <Link href={"/auth/login"}>
            <span>Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SubscriptionPlanInformation;
