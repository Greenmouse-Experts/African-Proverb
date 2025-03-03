import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { AddProverbValidationSchema, getAccessToken } from "@/utils";
import { HiUser } from "react-icons/hi";
import { uploadPicture } from "@/network/apiService";
import { toast } from "react-toastify";
import { ProfileContext } from "@/context/profileContext";
import Loader from "../reuse/loader";

const ProfileImage = () => {
  const [loading, setloading] = useState(false);
  const { state, getPicture, initials } = useContext(ProfileContext);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("picture", file);
      setloading(true);
      uploadPicture(formData)
        .then((res) => {
          if (res.status === 200) {
            getPicture();
            toast.success("Profile image updated");
            setloading(false);
          }
        })
        .catch((error) => {
          toast.error(error?.res?.data);
          setloading(false);
        });
    }
  };

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 ">
      {!state.imageUrl ? (
        <div className="w-full h-full rounded-full border-2 text-4xl text-white bg-[#BB5D06] border-gray-200 flex justify-center items-center">
          {initials}
        </div>
      ) : (
        <img
          src={state.imageUrl}
          alt="profile Image"
          className="w-20 h-20 md:w-24 md:h-24  rounded-full border-2 border-gray-200"
        />
      )}
      {loading && (
        <div className="absolute top-[2.5rem] left-[2.3rem] flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="absolute bottom-1 flex items-center justify-center text-xl right-0 text-white p-1 md:p-2 bg-orange-600 shadow-lg hover:cursor-pointer rounded-full">
        <label htmlFor="upload" className="hover:cursor-pointer">
          <AiOutlineCamera />
          <input
            type="file"
            name=""
            hidden
            id="upload"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;
