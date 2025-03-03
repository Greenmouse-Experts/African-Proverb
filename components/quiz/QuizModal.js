import { updateAttempts } from "@/network/quizService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const QuizModal = ({ quiz, index, setOpen, imageNumber }) => {
  const router = useRouter();
  localStorage.setItem('attempts',quiz.noOfAttempt)

  const handleMove = () => {
    updateAttempts(quiz.id)
      .then((res) => {
        if (res.status === 200) {
          router.push(`/quiz/${quiz.id}`);
        }
      })
      .catch((error) => {
        toast.error("Error starting quiz");
      });
  };

  return (
    <div>
      <div>
        <h1 className="text-[26px] text-center mt-2 mb-4 font-medium text-[#BB5D06]  ">
          Quiz Week {index + 1}
        </h1>
        <div className="rounded-3xl h-[252px]">
          <img
            className="rounded-3xl object-cover w-full h-full "
            src={`/img/quiz${imageNumber}.png`}
            alt="hello"
          />
        </div>
      </div>

      <div className="my-4">
        <p className="text-center leading-7 text-[16px">
          This quiz generated to check your background knowledge on your
          preferred language and other general subjects relating to Africa
          proverbs!
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
                <td class="p-2 text-lg text-center"> {quiz.noOfQuestions}</td>
                <td class="p-2 text-lg  text-center ">
                  {quiz.questionsAnswered}
                </td>
                <td class="p-2 text-lg text-center">{quiz.noOfAttempt}</td>
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
          Exit Quiz
        </button>

        <span
          onClick={handleMove}
          className="w-full p-2 cursor-pointer flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906]"
        >
          Attempt Quiz
        </span>
      </div>
    </div>
  );
};

export default QuizModal;
