import { useContext, useEffect, useReducer, useState } from "react";
import { ProfileContext } from "../profileContext";
import { AuthContext } from "@/context/authContext";
import {
  getFavouriteProverbs,
  getAddress,
  getFullDetails,
  getPersonalInfo,
  getUserPicture,
  getProfileDetails,
} from "@/network/apiService";
import useProfileApiCall from "@/hooks/useCallProfileApis";
import useApiCallProfileApis from "@/hooks/useCallProfileApis";
import { getAccessToken } from "@/utils";
import axios from "axios";

const initialState = {
  imageUrl: "",
};

function reducerFn(state, action) {
  switch (action.type) {
    case "setImage":
      return {
        ...state,
        imageUrl: action.imageUrl,
      };
    default:
      return state;
  }
}

const ProfileProvider = ({ children }) => {
  const [userpicture, setpicture] = useState(null);
  const [personalInfo, setinfo] = useState(null);
  const [initials, setinitials] = useState("");
  const [address, setuserAddress] = useState(null);
  const [fullDetails, setdetails] = useState(null);
  const [favoriteProverbs, setfavoriteProverbs] = useState(null);
  const [error, seterr] = useState(null);
  const [loading, setisLoading] = useState(false);
  const [updateInfo, setupdateInfo] = useState(false);
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const { user, isAuthenticated } = useContext(AuthContext);




  const getInitials = () => {
    let firstName = "";
    let lastName = "";
    if (personalInfo && personalInfo?.data && personalInfo?.data?.content) {
      firstName = personalInfo?.data?.content?.firstName;
      lastName = personalInfo?.data?.content?.lastName;
    }

    if (firstName && lastName) {
      const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase();
      return initials;
    } else {
      return "";
    }
  };

  const getPicture = async () => {
    try {
      const baseURL = process.env.BASE_URL;
      const token = getAccessToken();
      const AuthStr = "Bearer " + token;

      const response = await axios.get(baseURL + "/api/user/profile/picture", {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthStr,
        },
      });
      if (response?.status === 204) {
        dispatch({ type: "setImage", imageUrl: "" });
      } else {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        const imageUrl = `data:image/jpeg;base64,${base64}`;

        dispatch({ type: "setImage", imageUrl: imageUrl });
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  async function getAllData() {
    setisLoading(true);
    try {
      const [ address, fullDetails, favoriteProverbs] =
        await useApiCallProfileApis([
          // getUserPicture,
          getAddress,
          getFullDetails,
          getFavouriteProverbs,]);
      // setpicture(userpicture);
      setdetails(fullDetails);
      setuserAddress(address);
      setfavoriteProverbs(favoriteProverbs);
      setupdateInfo(false);
      setisLoading(false);
    } catch (error) {
      seterr(error);
      setisLoading(false);
      setupdateInfo(false);
    }
  }

  async function getProfileData() {
    setisLoading(true);
    try {
      const [ fullDetails ] =
        await useApiCallProfileApis([
          // getUserPicture,
          getProfileDetails,
        ]);
      // setpicture(userpicture);
      setdetails(fullDetails);
      setisLoading(false);
    } catch (error) {
      seterr(error);
      setisLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getPersonalInfo().then((res) => setinfo(res));
    }
  }, [isAuthenticated, updateInfo]);

  useEffect(() => {
    if (isAuthenticated) {
      //getAllData();
    }
  }, [updateInfo]);

  const resetInitials = () => {
    setinitials("");
  };
  useEffect(() => {
    if (!user) {
      resetInitials();
    }
  }, [user]);

  useEffect(() => {
    if (personalInfo) {
      const value = getInitials();
      setinitials(value);
    } else {
      resetInitials();
    }
  }, [personalInfo]);




  return (
    <ProfileContext.Provider
      value={{
        userpicture,
        personalInfo,
        address,
        error,
        fullDetails,
        favoriteProverbs,
        loading,
        getAllData,
        getProfileData,
        setdetails,
        setupdateInfo,
        dispatch,
        state,
        getPicture,
        initials,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
