import React, { useContext, useEffect, useState } from 'react';
import firstPosition from "@/public/icon/noto_1st-place-medal.svg";
import secondPosition from "@/public/icon/noto_2nd-place-medal.svg";
import { BiSolidCoupon } from "react-icons/bi";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import thirdPosition from "@/public/icon/noto_3rd-place-medal.svg";
import { ProfileContext } from "@/context/profileContext";
import { AuthContext } from "@/context/authContext";

import spotlight from "@/public/icon/memory_target.svg";
import Image from 'next/image';
import { Avatar } from 'antd';
import CouponList from '@/components/profile/CouponList';

const LeaderboardUpper = ({ details }) => {
    const { isAuthenticated } = useContext(AuthContext);

    const { state, fullDetails, getPicture, initials } = useContext(ProfileContext);
    const fullName = `${fullDetails?.data?.profile?.first_name} ${fullDetails?.data?.profile?.last_name}`;
    const Name = `${details?.firstName} ${details?.lastName}`;
    const [isOpenCouponModal, setisOpenCouponModal] = useState(false);

   

    const getPositionSuffix = (position) => {
        const lastDigit = position % 10;
        const secondLastDigit = Math.floor(position / 10) % 10;

        if (secondLastDigit === 1) {
            return 'th';
        }

        switch (lastDigit) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            getPicture();
        }
    }, [isAuthenticated]);

    const data = [
        {
            medal: firstPosition,
            medalColor: "#FCC417",
            medalType: 'Gold Medal',
            reward: '1st Place Reward',
            coupon: 'Wins Gold Subscription Coupon',
        },
        {
            medal: secondPosition,
            medalColor: '#9B9B9D',
            medalType: 'Silver Medal',
            reward: '2nd Place Reward',
            coupon: 'Wins Silver Subscription Coupon',
        },
        {
            medal: thirdPosition,
            medalColor: '#B08D57',
            medalType: 'Bronze Medal',
            reward: '3rd Place Reward',
            coupon: 'Wins Bronze Subscription Coupon',
        },
    ];


    const datatop = [
        {
            type: 'user',
            content: (
                <>
                    {state?.imageUrl ? (
                        <Avatar size={36} style={{ cursor: "pointer" }} src={state?.imageUrl} />
                    ) : (
                        <div className="w-[36px] h-[36px] flex justify-center items-center rounded-full text-white bg-[#BB5D06]">
                            {initials}
                        </div>
                    )}
                    <span className="text-[#BB5D06] text-lg font-semibold">{isAuthenticated === true ? fullName : Name} </span>
                </>
            ),
        },
        {
            type: 'position',
            content: (
                <>
                    <h2 className="text-lg font-semibold">Position & Reward</h2>
                    <ul>
                        <li className="flex gap-1">
                            {(!details || details.length === 0) ? (
                                <h1 className="text-gray-700 text-base font-normal">You do not have a position yet</h1>
                            ) : (
                                <>
                                    <Image src={spotlight} width={20} height={20} alt="3rd" />
                                    <span className="text-[#585858] font-semibold text-base">
                                        {details?.userPosition}
                                        {getPositionSuffix(details?.userPosition)} Place
                                    </span>
                                </>
                            )}
                        </li>
                        <li className="text-[#363636] text-sm font-normal ml-6">
                            {(details?.userPosition >= 1 && details?.userPosition <= 3) && `${details?.medalName} Won`}
                            {details?.userPosition > 3 && "No Prize Won"}
                        </li>

                    </ul>
                </>
            ),
        },
        {
            type: 'coupon',
            content: (
                <>
                    <h2 className="text-lg font-semibold">Active Coupon Details</h2>
                    {(!details || details.length === 0) ? (
                        <p className="text-gray-700 text-base font-normal">
                            You have No Active Coupons
                        </p>
                    ) : (
                        <div
                            onClick={() => setisOpenCouponModal(!isOpenCouponModal)}
                            className="flex justify-start cursor-pointer items-center gap-1 max-[960px]:justify-center"
                        >
                            <span className="text-base flex items-center text-[#707070]">
                                Active Coupons <BiSolidCoupon className="ml-1 mt-[0.1rem] text-[#BB5D06]" />
                            </span>
                        </div>
                    )}
                </>
            ),
        },
    ];


    return (
        <div className=' w-full flex flex-col items-center sm:w-[90%] pt-3  gap-4 bg-white shadow-md'>
            <div className="flex flex-col md:flex-row  gap-3 w-[100%] items-center justify-center px-10 border-b border-gray-300">
                {datatop.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full h-[97px] flex items-center  gap-2 ${index > 0 ? 'flex-col justify-start' : 'justify-center'
                            } ${index < datatop.length - 1 ? 'md:border-r md:border-gray-300' : ''
                            }`}
                    >
                        {item.content}
                    </div>
                ))}

            </div>
            {/* <ul className='flex flex-col md:flex-row gap-3 w-[100%] py-2 items-center justify-center border-b border-gray-300'>
                <li className="text-[#363636] text-base font-normal border-r border-gray-300 px-2">Quiz Attempted: <span className="text-lg font-bold">2</span></li>
                <li className="text-[#363636] text-base font-normal">Last Quiz: <span className="text-lg font-bold">Quiz Week 3</span></li>
                <li className="text-[#363636] text-base font-normal">Last Submission: <span className="text-lg font-bold">31st of Dec</span></li>
            </ul> */}
            <ReusableModal setOpen={setisOpenCouponModal} open={isOpenCouponModal}>
                <CouponList />
            </ReusableModal>

            <div className="flex flex-col md:flex-row  bg-[#F9F9F9] pb-4 gap-3 w-[100%] items-center justify-center px-10 sm:p-2">

                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full flex h-[97px] items-center justify-center gap-2 ${index < datatop.length - 1 ? 'md:border-r md:border-gray-300' : '' // Exclude on mobile
                            }`}
                    >
                        <Image src={item.medal} width={40} height={40} alt={`Medal ${index + 1}`} />
                        <ul>
                            <li style={{ color: item.medalColor }} className="font-semibold text-base">
                                {item.medalType} <span className="text-[#363636] text-base font-normal">{item.reward}</span>
                            </li>
                            <li className="text-[#363636] text-base font-normal">{item.coupon}</li>
                        </ul>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default LeaderboardUpper;