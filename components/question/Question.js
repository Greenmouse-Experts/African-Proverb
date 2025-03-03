import { useContext, useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionNumbers from "./QuestionNumbers";
import { QuizContext } from "@/context/quizContext";
import { useRouter } from "next/router";
import QuestionsBackground from "./QuestionsBackground";
import QuestionLoader from "./QuestionLoader";

const Questions = () => {
  const router = useRouter();
  const { setBatchId, isLoading } = useContext(QuizContext);

  useEffect(() => {
    if (router.query.id) {
      setBatchId(router.query.id);
    }
  }, [router.query.id]);

  function handleClose() {
    router.push("/quiz");
  }

  return (
    <>
      {!isLoading ? (
        <QuestionLoader />
      ) : (
        <QuestionsBackground>
          <div className="p-10 max-w-[1300px] mx-auto  gap-10 md:gap-20 flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="mb-4 md:mb-[11rem]">
                <img src="/img/african-logo-2.svg" alt="logo" />
                <h1 className="text-[20px] mt-4 tracking-wide">
                  Welcome to your Quiz portal!
                </h1>
              </div>
              <QuestionNumbers />
            </div>
            <div className="flex flex-[3] flex-col md:flex-row  justify-between items-start">
              <div className="order-2 md:order-1 ">
                <QuestionCard />
              </div>
              <button
                onClick={handleClose}
                className="px-6 my-2 order-1 md:order-2  bg-white p-2 flex gap-2 items-center justify-center rounded-[5px] border  text-[#BB5906] border-[#BB5906]"
              >
                close
              </button>
            </div>
          </div>
        </QuestionsBackground>
      )}
    </>
  );
};

export default Questions;
