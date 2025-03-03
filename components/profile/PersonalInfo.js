import React from "react";

const PersonalInfo = ({ personalInfo }) => {
  return (
    <>
      <div>
        <label htmlFor="First Name" className="text-gray-500">
          First Name
        </label>
        <p className="mt-2">{personalInfo?.data?.content?.firstName}</p>
      </div>
      <div>
        <label htmlFor="Surname Name" className="text-gray-500">
          Surname
        </label>
        <p className="mt-2">{personalInfo?.data?.content?.lastName}</p>
      </div>
      <div>
        <label htmlFor="Gender" className="text-gray-500 ">
          Other Name
        </label>
        <p className="mt-2 capitalize">{personalInfo?.data?.content?.otherName}</p>
      </div>

      <div>
        <label htmlFor="Phone Number" className="text-gray-500">
          Phone Number
        </label>
        <p className="mt-2">{personalInfo?.data?.content?.phoneNumber}</p>
      </div>
      <div>
        <label htmlFor="Preffered Language" className="text-gray-500">
          Nickname
        </label>
        <p className="mt-2">{personalInfo?.data?.content?.nickName}</p>
      </div>
      <div>
        <label htmlFor="Preffered Language" className="text-gray-500">
          UserName
        </label>
        <p className="mt-2">{personalInfo?.data?.content?.username}</p>
      </div>
    </>
  );
};

export default PersonalInfo;
