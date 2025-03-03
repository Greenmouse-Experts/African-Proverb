import React, { useContext } from "react";
import AuthLayout from "@/components/reuse/auth_Layout";
import { AllNotificationsComponent } from "@/components/usernotification/allnotificationcomponent";
import CustomAds from "@/components/customads";

const AllNotifications = () => {
  return (
    <AuthLayout>
      <main className="w-[95%] lg:w-11/12 mx-auto flex items-center justify-center">
        <AllNotificationsComponent />
        <CustomAds />
      </main>
    </AuthLayout>
  );
};

export default AllNotifications;
