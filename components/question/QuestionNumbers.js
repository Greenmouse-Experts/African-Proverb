import { QuizContext } from "@/context/quizContext";
import { useContext } from "react";

const QuestionNumbers = () => {
  const { questionData, submissionAnswerData, questionInStateIndex } =
    useContext(QuizContext);

  return (
    <div className="flex gap-1 md:gap-6   w-full justify-around md:justify-start max-w-[400px]">
      {questionData?.ethnicFactQuestions.map((question, index) => {
        return (
          <span
            key={ question.ethnicfactQuestionId}
            className={`text-xl md:text-2xl h-10 w-10 md:h-12 md:w-12 cursor-pointer flex items-center  ${
              submissionAnswerData.find(({ ethnicFactQuestionId }) => {

                return ethnicFactQuestionId === question.ethnicfactQuestionId;
              })
                ? "bg-[rgba(187, 93, 6, 0.14)] border-[#BB5D06] text-[#BB5D06]"
                : "bg-white border-[#707070] text-[#707070]"
            } justify-center rounded-full border-2  `}
          >
            {index + 1}
          </span>
        );
      })}
    </div>
  );
};

export default QuestionNumbers;
