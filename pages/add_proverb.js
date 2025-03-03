import React, { useContext, useEffect, useState } from "react";
import AddProverbStyles from "@/styles/AddProverbs.module.scss";
import ReusableTextField from "@/components/reuse/textfield";
import { useFormik } from "formik";
import { AddProverbValidationSchema } from "@/utils";
import SelectDropdown from "@/components/reuse/selectDropdown";
import Button from "@/components/reuse/button";
import { EthnicContext } from "@/context/ethnicContext";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import Image from "next/image";
import SuccessIcon from "@/public/img/success-icon.png";
import Link from "next/link";
import AuthLayout from "@/components/reuse/auth_Layout";
import { addProverbs } from "@/network/apiService";
import { ProfileContext } from "@/context/profileContext";
import { AuthContext } from "@/context/authContext";
import Loader from "@/components/reuse/loader";
import CustomAds from "@/components/customads";

const AddProverb = () => {
  const { ethnicsList, categoriesList, languages } = useContext(EthnicContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const {
    fullDetails,
    personalInfo,
    loading: profileDetailsLoading,
  } = useContext(ProfileContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: isAuthenticated
        ? personalInfo?.data?.content?.firstName +
          " " +
          personalInfo?.data?.content?.lastName
        : "",
      suggestedCategory: "",
      language: "",
      ethnic: "",
      suggestedProverb: "",
      suggestedEnglishTransliteration: "",
      suggestedEnglishInterpretation: "",
    },

    validationSchema: AddProverbValidationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const proverbData = {
        email: values.email,
        name: values.name,
        category_id: values.suggestedCategory,
        language_id: values.language,
        ethnic_id: values.ethnic,
        content: values.suggestedProverb,
        english_transliteration: values.suggestedEnglishTransliteration,
        english_interpretation: values.suggestedEnglishInterpretation,
      };
      addProverbs(proverbData)
        .then((res) => {
          if (res.status === 201) {
            setIsSuccess(true);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.message);
        });

      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      formik.setValues({
        ...formik.values,
        email: isAuthenticated ? fullDetails?.data?.email : "",
        name: isAuthenticated
          ? `${personalInfo?.data?.content?.firstName} ${personalInfo?.data?.content?.lastName}`
          : "",
      });
    }
  }, [
    personalInfo,
    isAuthenticated,
    fullDetails,
    formik.values.email,
    formik.values.name,
  ]);

  return (
    <AuthLayout>
      <div className={AddProverbStyles["main-container"]}>
        <ReusableModal setOpen={setIsSuccess} open={isSuccess}>
          <div className={AddProverbStyles["modal-content"]}>
            <Image
              src={SuccessIcon}
              width={80}
              height={80}
              alt="Success Icon"
            />
            <p>
              Submit successful! <br></br>Proverb awaiting review.
            </p>

            <div className={AddProverbStyles["modal-content-btn"]}>
              <button
                onClick={() => setIsSuccess(false)}
                className={AddProverbStyles["btn-1"]}
              >
                Suggest more
              </button>
              <Link href={"/"}>
                <button className={AddProverbStyles["btn-2"]}>
                  Go to Homepage
                </button>
              </Link>
            </div>
          </div>
        </ReusableModal>
        <div className={AddProverbStyles["form-container"]}>
          <h1>Add Proverb</h1>
          <form onSubmit={formik.handleSubmit}>
            {profileDetailsLoading ? (
              <Loader />
            ) : (
              <div className={AddProverbStyles["double-column-fields"]}>
                <ReusableTextField
                  label="Email"
                  id="email"
                  name="email"
                  type={"email"}
                  placeholder="hello@email.com"
                  value={
                    isAuthenticated
                      ? fullDetails?.data?.email
                      : formik.values.email
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <ReusableTextField
                  label="Name"
                  id="name"
                  name="name"
                  type={"text"}
                  placeholder="John Doe"
                  value={
                    isAuthenticated
                      ? personalInfo?.data?.content?.firstName +
                        " " +
                        personalInfo?.data?.content?.lastName
                      : formik.values.name
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
            )}

            <SelectDropdown
              id="ethnic"
              name="ethnic"
              label="Ethnic"
              items={ethnicsList}
              value={formik.values.ethnic}
              placeholder="Hello"
              onChange={formik.handleChange}
              // onChange={(e) => setPreferredLanguage(e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.ethnic && Boolean(formik.errors.ethnic)}
              helperText={formik.touched.ethnic && formik.errors.ethnic}
            >
              {ethnicsList?.map((item, index) => {
                return (
                  <MenuItem key={item.name} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </SelectDropdown>
            <div className={AddProverbStyles["double-column-fields"]}>
              <SelectDropdown
                id="language"
                name="language"
                label="Language"
                items={languages}
                value={formik.values.language}
                placeholder="Hello"
                onChange={formik.handleChange}
                // onChange={(e) => setPreferredLanguage(e.target.value)}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.language && Boolean(formik.errors.language)
                }
                helperText={formik.touched.language && formik.errors.language}
              >
                {languages
                  .filter((item) => item.name === "English")
                  .map((item, index) => (
                    <MenuItem key={item.name} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                {/* {languages?.map((item, index) => {
                  return (
                    <MenuItem key={item.name} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })} */}
              </SelectDropdown>
              <SelectDropdown
                id="suggestedCategory"
                name="suggestedCategory"
                label="Suggested Category"
                items={categoriesList}
                value={formik.values.suggestedCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.suggestedCategory &&
                  Boolean(formik.errors.suggestedCategory)
                }
                helperText={
                  formik.touched.suggestedCategory &&
                  formik.errors.suggestedCategory
                }
              >
                {categoriesList?.map((item, index) => {
                  return (
                    <MenuItem key={item.name} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </SelectDropdown>
            </div>
            <ReusableTextField
              label="Suggested Proverb"
              id="suggestedProverb"
              name="suggestedProverb"
              type={"text"}
              placeholder="Write your suggested proverb here"
              value={formik.values.suggestedProverb}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.suggestedProverb &&
                Boolean(formik.errors.suggestedProverb)
              }
              helperText={
                formik.touched.suggestedProverb &&
                formik.errors.suggestedProverb
              }
              multiline={true}
              minRows={4}
            />
            <ReusableTextField
              label="Suggested English Transliteration"
              id="suggestedEnglishTransliteration"
              name="suggestedEnglishTransliteration"
              type={"text"}
              placeholder="Write your suggested transliteration here"
              value={formik.values.suggestedEnglishTransliteration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.suggestedEnglishTransliteration &&
                Boolean(formik.errors.suggestedEnglishTransliteration)
              }
              helperText={
                formik.touched.suggestedEnglishTransliteration &&
                formik.errors.suggestedEnglishTransliteration
              }
              multiline={true}
              minRows={4}
            />
            <ReusableTextField
              label="Suggested English Interpretation"
              id="suggestedEnglishInterpretation"
              name="suggestedEnglishInterpretation"
              type={"text"}
              placeholder="Write your suggested interpretation here"
              value={formik.values.suggestedEnglishInterpretation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.suggestedEnglishInterpretation &&
                Boolean(formik.errors.suggestedEnglishInterpretation)
              }
              helperText={
                formik.touched.suggestedEnglishInterpretation &&
                formik.errors.suggestedEnglishInterpretation
              }
              multiline={true}
              minRows={4}
            />

            <Button
              textInput="Submit"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
      <CustomAds />
    </AuthLayout>
  );
};

export default AddProverb;
