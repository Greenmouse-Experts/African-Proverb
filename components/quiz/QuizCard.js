import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import QuizModal from "./QuizModal";
import ReusableModal from "../reuse/resuableModal/reuseable_modal";
import { convertToHumanReadableDate } from "@/utils";
import { useRouter } from "next/router";

// import Icon from "";
const QuizCard = ({ quiz, index }) => {
  const [isquizModalOpen, setIsQuizModalOpen] = useState(false);
  const router= useRouter()

  const numberofcoverImages = 4
  const imageNumber = Math.floor(Math.random() * numberofcoverImages) + 1;

  

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={`/img/quiz${imageNumber}.png`} alt="hello" />
      </a>
      <div className="py-5 px-2">
        <div className="mt-2 flex items-center justify-between">
          <span className="bg-opacity-[8%] rounded-[5px] bg-[#BB5D0614] text-[#a5412a] py-1 px-6 text-[16px]">
            Quiz  {index + 1}
          </span>
          <span
            className="text-[#585858] text-[12px]
"
          >
            {convertToHumanReadableDate(quiz.dateCreated)}
          </span>
        </div>
        <div className="my-4">
          <p className="text-[18px] leading-6">
            {quiz.description ||
              " A more incentive quiz that gives you more knowledge about your Origin."}
          </p>
        </div>

        <div className="my-2 flex justify-between p-1 border-b-[0.5px] border-[#e99e59cc]">
          <span className="text-[16px] gap-1 font-[600] text-[#BB5D06] flex items-center">
          <img
              className="rounded-t-lg"
              src="/img/typcn_time.svg"
              alt="hello"
            />
            STATUS:
          </span>
          <span className="text-[16px] font-normal text-[#BB5D06]">
            {quiz.status}
          </span>
        </div>

        {/* <div className="my-2 flex justify-between p-1 border-b-[0.5px] border-[#e99e59cc]">
          <span className="text-[16px] gap-1 font-[600] text-[#BB5D06] flex items-center">
            <img
              className="rounded-t-lg"
              src="/img/typcn_time.svg"
              alt="hello"
            />
            Difficulty:
          </span>
          <span className="text-[16px] font-normal text-[#BB5D06]">
            {" "}
            {quiz.difficulty
              ? convertToHumanReadableDate(quiz.difficulty)
              : "N/A"}
          </span>
        </div> */}

        <div className="my-2 flex justify-between p-1 border-b-[0.5px] border-[#e99e59cc]">
          <span className="text-[16px] gap-1 font-[600] text-[#BB5D06] flex items-center">
            <img className="rounded-t-lg" src="/img/carbon.svg" alt="hello" />
            Questions:
          </span>
          <span className="text-[16px] font-normal text-[#BB5D06]">
            {quiz.noOfQuestions}
          </span>
        </div>
        <div className="mt-6 ">
         {quiz.status==="CLOSE"?<button
            onClick={() => router.push(`/quiz/${quiz.id}/submit/`)}
            className="w-full p-2 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906]"
          >
            View Results <FaArrowRight />
          </button>: <button
            onClick={() => setIsQuizModalOpen(!isquizModalOpen)}
            className="w-full p-2 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906]"
          >
            Attempt Quiz <FaArrowRight />
          </button>}
        </div>
        <ReusableModal open={isquizModalOpen} setOpen={setIsQuizModalOpen}>
          <QuizModal quiz={quiz} index={index} setOpen={setIsQuizModalOpen} imageNumber={imageNumber} />
        </ReusableModal>
      </div>
    </div>
  );
};

export default QuizCard;
