import AuthWrapper from "@/components/auth/auth_wrapper";
import Button from "@/components/reuse/button";
import ReusableTextField from "@/components/reuse/textfield";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { requestPasswordReset } from "@/network/apiService";
import useApiCall from "@/hooks/useCallApi";
import AuthHeader from "@/components/auth/auth_header";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request is initiated

    requestPasswordReset({
      email: email,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setEmail("");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data.data.message);
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <AuthHeader headerText="Forgot password?" />

      <p className="text-gray-400 text-xs text-center -mt-5 mb-8">
        No worries, we’ll send you reset instructions.
      </p>

      <form className="flex flex-col gap-4 px-5" onSubmit={handleSubmit}>
        <ReusableTextField
          required
          icon="email"
          label="Email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mb-2.9">
          <Button
            isLoading={loading}
            type="submit"
            textInput={"Reset Password"}
            disabled={loading}
          ></Button>
        </div>

        <Link
          className="text-[#BB5D06] text-center flex justify-center gap-2 mt-4 "
          href={"/auth/login"}
        >
          <KeyboardBackspaceIcon />
          <p>Back to login</p>
        </Link>
      </form>
    </AuthWrapper>
  );
};

export default ForgetPassword;
