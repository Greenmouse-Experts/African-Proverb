import { useState } from "react";
import { SignupContext } from "../signupContext";

const SignupProvider = ({ children }) => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);




  return (
    <SignupContext.Provider
      value={{
        ethnicsList,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
