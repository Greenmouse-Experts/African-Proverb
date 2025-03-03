import React, { useContext, useState, useEffect } from "react";
import { Avatar, Dropdown, Menu, Modal } from "antd";
import {
  LogoutOutlined, ExclamationCircleOutlined
} from "@ant-design/icons";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProfileContext } from "@/context/profileContext";

export default function AccountMenu() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { state, getPicture, initials } = useContext(ProfileContext);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleDeactivateAccount = () => {
    Modal.confirm({
      title: 'Are you sure you want to deactivate your account?',
      icon: <ExclamationCircleOutlined />,
      content: 'You cannot reversed this action, Contact Admin for reactivation!',
      okText: 'Yes, Deactivate',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setIsDeactivating(true);
        // Call your API to deactivate the account
        // For example: deactivateAccount().then(() => { ... });
        // Reset the state after deactivation
        setTimeout(() => {
          setIsDeactivating(false);
          handleLogout();
        }, 2000);
      },
      cancelButtonProps: {
        style: {
          background: "#BB5D06",
          color: '#fff',
          border: '1px solid #BB5D06',
        },
      },
    });
  };


  const items = [
    {
      key: "profile",
      label: (
        <Link href="/profile">
          <span className="flex gap-2">
            {state?.imageUrl ? (
              <Avatar size={30} src={state?.imageUrl} />
            ) : (
              <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full text-white text-md bg-[#BB5D06]">
                {initials}
              </div>
            )}
            Profile
          </span>
        </Link>
      ),
    },
    {
      key: 'deactivate',
      label: (
        <a onClick={handleDeactivateAccount}>
          <span className="flex gap-2">
            <ExclamationCircleOutlined /> Deactivate Account
          </span>
        </a>
      ),
    },

    {
      key: "logout",
      label: (
        <a onClick={handleLogout}>
          <span className="flex gap-2">
            <LogoutOutlined /> Logout
          </span>
        </a>
      ),
    },
  ];

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
  useEffect(() => {
    if (isAuthenticated) {
      getPicture();
    }
  }, [isAuthenticated]);
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft" arrow>
      {state?.imageUrl ? (
        <Avatar size={36} style={{ cursor: "pointer" }} src={state?.imageUrl} />
      ) : (
        <div
          className="w-[36px] h-[36px] flex justify-center items-center rounded-full text-white bg-[#BB5D06]
         ">
          {initials}
        </div>
      )}
    </Dropdown>
  );
}
