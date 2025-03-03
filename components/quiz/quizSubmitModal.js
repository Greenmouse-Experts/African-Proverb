import { QuizContext } from "@/context/quizContext";
import { useContext } from "react";
import Loader from "../reuse/loader";
import { useRouter } from "next/router";

const QuizSubmitModal = ({ questionsLength, setOpen }) => {
  const { handleSubmitQuiz, submitLoader } = useContext(QuizContext);
  const attempts = localStorage.getItem('attempts')

  return (
    <div>
      <div className="flex justify-center">
        <img
          className="rounded-3xl object-cover w-[50px] h-[50px] "
          src={`/img/submiticon.svg`}
          alt="hello"
          width={50}
          height={50}
        />
      </div>
      <div className="my-4">
        <p className="text-center leading-7 text-[16px">
          Are you sure you want to submit this Quiz?
        </p>
        <div className="border  my-4 mb-12 rounded-lg border-[#858585]">
          <table className="w-full p-1">
            <thead class="text-xs border-b border-[#858585]  ">
              <tr>
                <td scope="col" class="p-2 text-lg text-center">
                  Total Question
                </td>
                <td scope="col" class="p-2  text-lg text-center">
                  Answered
                </td>
                <td scope="col" class="p-2 text-lg text-center">
                  Total Attempts
                </td>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-whit">
                <td class="p-2 text-lg text-center"> {questionsLength}</td>
                <td class="p-2 text-lg  text-center ">{questionsLength}</td>
                <td class="p-2 text-lg text-center">{attempts}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 gap-5 flex">
        <button
          onClick={() => setOpen()}
          className="w-full p-2 flex gap-2 items-center justify-center rounded-[5px] border  text-[#BB5906] border-[#BB5906]"
        >
          Go back to Quiz
        </button>

        <button
          onClick={() => handleSubmitQuiz()}
          className="w-full p-2 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906]"
        >
          {submitLoader ? "Submitting" : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizSubmitModal;
