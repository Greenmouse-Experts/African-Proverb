import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const FreeTrial = ({ Logo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <p
        onClick={showModal}
        className="text-[#fff] text-sm bg-[#BB5D06] font-bold cursor-pointer text-md p-3 px-3 rounded-lg"
      >
        Start Free Trial
      </p>
      <Modal
        open={isModalOpen}
        closeIcon={false}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-white"
        width={800}
      >
        <div className="w-full h-full flex flex-col justify-center items-center md:items-start gap-10 md:flex-row md:justify-between">
          <div className="bg-[#BB5D06] h-40 w-40 rounded-lg p-5 flex justify-center items-center">
            <Image
              src={Logo}
              width={"180"}
              height={"180"}
              alt={"African Proverb Logo"}
            />
          </div>
          <div className="w-full md:w-60 flex flex-col items-center md:items-start gap-3">
            <h2 className="text-lg text-center">Start Your Free Trial Now!</h2>
            <p className="text-xs font-thin text-center md:text-start">
              Get 30 days access to all our platinum plan features.
            </p>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3 text-center md:text-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_5238_8136)">
                    <path
                      d="M8.18176 8.86346H6.81813V8.18164H6.13631V6.818H6.81813V6.13619H8.18176V6.818H8.86358V8.18164H8.18176V8.86346ZM9.5454 11.5907H5.45449V10.9089H4.77267V10.2271H4.09085V9.54528H3.40904V5.45437H4.09085V4.77255H4.77267V4.09073H5.45449V3.40891H9.5454V4.09073H10.2272V4.77255H10.909V5.45437H11.5909V9.54528H10.909V10.2271H10.2272V10.9089H9.5454V11.5907ZM10.2272 14.318H4.77267V13.6362H3.40904V12.9544H2.72722V12.2725H2.0454V11.5907H1.36358V10.2271H0.681763V4.77255H1.36358V3.40891H2.0454V2.7271H2.72722V2.04528H3.40904V1.36346H4.77267V0.681641H10.2272V1.36346H11.5909V2.04528H12.2727V2.7271H12.9545V3.40891H13.6363V4.77255H14.3181V10.2271H13.6363V11.5907H12.9545V12.2725H12.2727V12.9544H11.5909V13.6362H10.2272V14.318ZM8.86358 10.2271V9.54528H9.5454V8.86346H10.2272V6.13619H9.5454V5.45437H8.86358V4.77255H6.13631V5.45437H5.45449V6.13619H4.77267V8.86346H5.45449V9.54528H6.13631V10.2271H8.86358ZM9.5454 12.9544V12.2725H10.909V11.5907H11.5909V10.9089H12.2727V9.54528H12.9545V5.45437H12.2727V4.09073H11.5909V3.40891H10.909V2.7271H9.5454V2.04528H5.45449V2.7271H4.09085V3.40891H3.40904V4.09073H2.72722V5.45437H2.0454V9.54528H2.72722V10.9089H3.40904V11.5907H4.09085V12.2725H5.45449V12.9544H9.5454Z"
                      fill="#C16B40"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5238_8136">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Explore diverse African cultures through authentic proverbs.
              </li>
              <li className="flex items-center gap-3 text-center md:text-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_5238_8136)">
                    <path
                      d="M8.18176 8.86346H6.81813V8.18164H6.13631V6.818H6.81813V6.13619H8.18176V6.818H8.86358V8.18164H8.18176V8.86346ZM9.5454 11.5907H5.45449V10.9089H4.77267V10.2271H4.09085V9.54528H3.40904V5.45437H4.09085V4.77255H4.77267V4.09073H5.45449V3.40891H9.5454V4.09073H10.2272V4.77255H10.909V5.45437H11.5909V9.54528H10.909V10.2271H10.2272V10.9089H9.5454V11.5907ZM10.2272 14.318H4.77267V13.6362H3.40904V12.9544H2.72722V12.2725H2.0454V11.5907H1.36358V10.2271H0.681763V4.77255H1.36358V3.40891H2.0454V2.7271H2.72722V2.04528H3.40904V1.36346H4.77267V0.681641H10.2272V1.36346H11.5909V2.04528H12.2727V2.7271H12.9545V3.40891H13.6363V4.77255H14.3181V10.2271H13.6363V11.5907H12.9545V12.2725H12.2727V12.9544H11.5909V13.6362H10.2272V14.318ZM8.86358 10.2271V9.54528H9.5454V8.86346H10.2272V6.13619H9.5454V5.45437H8.86358V4.77255H6.13631V5.45437H5.45449V6.13619H4.77267V8.86346H5.45449V9.54528H6.13631V10.2271H8.86358ZM9.5454 12.9544V12.2725H10.909V11.5907H11.5909V10.9089H12.2727V9.54528H12.9545V5.45437H12.2727V4.09073H11.5909V3.40891H10.909V2.7271H9.5454V2.04528H5.45449V2.7271H4.09085V3.40891H3.40904V4.09073H2.72722V5.45437H2.0454V9.54528H2.72722V10.9089H3.40904V11.5907H4.09085V12.2725H5.45449V12.9544H9.5454Z"
                      fill="#C16B40"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5238_8136">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Gain insights into traditions, values, and wisdom
              </li>
              <li className="flex items-center gap-3 text-center md:text-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_5238_8136)">
                    <path
                      d="M8.18176 8.86346H6.81813V8.18164H6.13631V6.818H6.81813V6.13619H8.18176V6.818H8.86358V8.18164H8.18176V8.86346ZM9.5454 11.5907H5.45449V10.9089H4.77267V10.2271H4.09085V9.54528H3.40904V5.45437H4.09085V4.77255H4.77267V4.09073H5.45449V3.40891H9.5454V4.09073H10.2272V4.77255H10.909V5.45437H11.5909V9.54528H10.909V10.2271H10.2272V10.9089H9.5454V11.5907ZM10.2272 14.318H4.77267V13.6362H3.40904V12.9544H2.72722V12.2725H2.0454V11.5907H1.36358V10.2271H0.681763V4.77255H1.36358V3.40891H2.0454V2.7271H2.72722V2.04528H3.40904V1.36346H4.77267V0.681641H10.2272V1.36346H11.5909V2.04528H12.2727V2.7271H12.9545V3.40891H13.6363V4.77255H14.3181V10.2271H13.6363V11.5907H12.9545V12.2725H12.2727V12.9544H11.5909V13.6362H10.2272V14.318ZM8.86358 10.2271V9.54528H9.5454V8.86346H10.2272V6.13619H9.5454V5.45437H8.86358V4.77255H6.13631V5.45437H5.45449V6.13619H4.77267V8.86346H5.45449V9.54528H6.13631V10.2271H8.86358ZM9.5454 12.9544V12.2725H10.909V11.5907H11.5909V10.9089H12.2727V9.54528H12.9545V5.45437H12.2727V4.09073H11.5909V3.40891H10.909V2.7271H9.5454V2.04528H5.45449V2.7271H4.09085V3.40891H3.40904V4.09073H2.72722V5.45437H2.0454V9.54528H2.72722V10.9089H3.40904V11.5907H4.09085V12.2725H5.45449V12.9544H9.5454Z"
                      fill="#C16B40"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5238_8136">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Improve language skills with audio proverbs in various African
                languages.
              </li>
              <li className="flex items-center gap-3 text-center md:text-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_5238_8136)">
                    <path
                      d="M8.18176 8.86346H6.81813V8.18164H6.13631V6.818H6.81813V6.13619H8.18176V6.818H8.86358V8.18164H8.18176V8.86346ZM9.5454 11.5907H5.45449V10.9089H4.77267V10.2271H4.09085V9.54528H3.40904V5.45437H4.09085V4.77255H4.77267V4.09073H5.45449V3.40891H9.5454V4.09073H10.2272V4.77255H10.909V5.45437H11.5909V9.54528H10.909V10.2271H10.2272V10.9089H9.5454V11.5907ZM10.2272 14.318H4.77267V13.6362H3.40904V12.9544H2.72722V12.2725H2.0454V11.5907H1.36358V10.2271H0.681763V4.77255H1.36358V3.40891H2.0454V2.7271H2.72722V2.04528H3.40904V1.36346H4.77267V0.681641H10.2272V1.36346H11.5909V2.04528H12.2727V2.7271H12.9545V3.40891H13.6363V4.77255H14.3181V10.2271H13.6363V11.5907H12.9545V12.2725H12.2727V12.9544H11.5909V13.6362H10.2272V14.318ZM8.86358 10.2271V9.54528H9.5454V8.86346H10.2272V6.13619H9.5454V5.45437H8.86358V4.77255H6.13631V5.45437H5.45449V6.13619H4.77267V8.86346H5.45449V9.54528H6.13631V10.2271H8.86358ZM9.5454 12.9544V12.2725H10.909V11.5907H11.5909V10.9089H12.2727V9.54528H12.9545V5.45437H12.2727V4.09073H11.5909V3.40891H10.909V2.7271H9.5454V2.04528H5.45449V2.7271H4.09085V3.40891H3.40904V4.09073H2.72722V5.45437H2.0454V9.54528H2.72722V10.9089H3.40904V11.5907H4.09085V12.2725H5.45449V12.9544H9.5454Z"
                      fill="#C16B40"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5238_8136">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Provide free access to entertaining audio and video proverbs.
              </li>
            </ul>
          </div>

          <Link
            className="bg-[#BB5D06] h-10 flex justify-center items-center p-3 rounded-sm md:self-end"
            href={"/auth/signup?freeTrial=true"}
          >
            Activate Free Trial Now
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default FreeTrial;
