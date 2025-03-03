import { QuizContext } from "@/context/quizContext";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaLock } from "react-icons/fa";
import QuestionProgress from "./QuestionProgress";
import ReusableModal from "../reuse/resuableModal/reuseable_modal";
import QuizSubmitModal from "../quiz/quizSubmitModal";
import QuizModal from "../quiz/QuizModal";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  SubmitAnswerForQuestion,
  getInitialAnswerForQuestion,
  getEthnicflagOrSymbol,
} from "@/network/quizService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loader from "../reuse/loader";
import { getAccessToken } from "@/utils";
import { AuthContext } from "@/context/authContext";


import axios from "axios";

const QuestionCard = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const {
    questionData,
    addAnswer,
    submissionAnswerData,
    questionInStateIndex,
    setQuestionInStateIndex,
    setsubmissionAnswerData,
  } = useContext(QuizContext);
  const [isquizModalOpen, setIsQuizModalOpen] = useState(false);
  const [submitAttemptText, setSubmitAttemptText] = useState("Lock In Answer");
  const [intialAttempt, setInitialAttempt] = useState(null);
  const [image, setimage] = useState("");
  const router = useRouter();
  const { submit } = router.query;

  const changeQuestionForward = async () => {
    //move to next question
    if (questionInStateIndex < questionData.ethnicFactQuestions.length) {
      setQuestionInStateIndex(questionInStateIndex + 1);
    }
  };

  const changeQuestionBackward = () => {
    if (questionInStateIndex > 1) {
      setQuestionInStateIndex(questionInStateIndex - 1);
    }
  };

  const handleSubmitAttempt = () => {
    setSubmitAttemptText("Locking In Answer");
    //prepare payload
    const payload = {
      batchId: questionData.batchId,
      quizId: questionData.id,
      questionAnswers: [
        {
          answerOptionId:
            submissionAnswerData[questionInStateIndex - 1]?.answerOptionId,
          ethnicFactQuestionId:
            questionData?.ethnicFactQuestions[questionInStateIndex - 1]
              ?.ethnicfactQuestionId,
        },
      ],
    };
    //submit
    SubmitAnswerForQuestion(payload)
      .then((res) => {
        if (res.status === 200) {
          setSubmitAttemptText("Locked In Answer");
        }
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          if (e.response.status === 500) {
            toast.error("An error occured while trying to submit answer");
          }
        } else {
          toast.error("An error Occured while trying to submit answer");
        }
        setSubmitAttemptText("Lock In Answer");
      });
  };

  useEffect(() => {
    const ethnicFactQuestionId =
      questionData?.ethnicFactQuestions[questionInStateIndex - 1]
        .ethnicfactQuestionId;
    // getEthnicflagOrSymbol(ethnicFactQuestionId)
    //   .then((response) => {
    //     const base64 = btoa(
    //       new Uint8Array(response.data).reduce(
    //         (data, byte) => data + String.fromCharCode(byte),
    //         ""
    //       )
    //     );

    //     const imageUrl = `data:image/jpeg;base64,${base64}`;
    //     setimage(imageUrl);
    //   })
    //   .catch((e) => {
    //     if (e instanceof AxiosError) {
    //       if (e.response.status === 500) {
    //         toast.error("An error occured while trying to ethnic flag");
    //       }
    //     } else {
    //       toast.error("An error Occured while trying to submit answer");
    //     }
    //   });

    const getPicture = async () => {
      try {
        const baseURL = process.env.BASE_URL;
        const token = getAccessToken();
        const AuthStr = "Bearer " + token;

        const response = await axios.get(
          baseURL +
          `/api/quiz/questionWithSymbolsOrFlags/${ethnicFactQuestionId}`,
          {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              Authorization: AuthStr,
            },
          }
        );
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        const imageUrl = `data:image/jpeg;base64,${base64}`;
        setimage(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (isAuthenticated) { getPicture(); }
  }, [questionInStateIndex]);

  useEffect(() => {
    if (!questionData) return;
    const ethnicQuestionID =
      questionData?.ethnicFactQuestions[questionInStateIndex - 1]
        ?.ethnicfactQuestionId;
    const quizid = questionData.id;
    getInitialAnswerForQuestion(ethnicQuestionID, quizid)
      .then(({ data }) => {
        const answer = questionData?.ethnicFactQuestions[
          questionInStateIndex - 1
        ].answers.filter((answer) => answer.alias === data.answer)[0];

        if (answer) {
          const initialAnswer = {
            id: answer.id,
            ethnicfactQuestionId: answer.ethnicfactQuestionId,
          };
          addAnswer(
            initialAnswer,
            questionInStateIndex - 1,
            questionData?.ethnicFactQuestions[questionInStateIndex - 1]
          );
        }
      })
      .catch((error) => {
        toast.error("an error occured while trying to fetch answer");
      });
  }, [questionInStateIndex]);

  return (
    <>
      <div className=" lg:w-[505px] ">
        <div className="flex  flex-col rounded-2xl  p-5 py-8 bg-white">
          <h1 className="text-[20px] mb-4 text-gray-400 font-medium">
            Question {questionInStateIndex} of{" "}
            {questionData?.ethnicFactQuestions.length}
          </h1>
          <QuestionProgress
            questionInStateIndex={questionInStateIndex}
            total={questionData?.ethnicFactQuestions.length}
          />
          <div className="p-4 md:p-10 border-[5px] flex items-center justify-between my-6 border-[#BB5D06]">
            <Image
              src={image}
              alt="Ethnic Flag or Symbol"
              width={50}
              height={30}
            />
            <p className="text-[24px] leading-8 text-center font-medium flex justify-between">
              {
                questionData?.ethnicFactQuestions[questionInStateIndex - 1]
                  .question
              }
            </p>
          </div>
          <div>
            <ul>
              {questionData?.ethnicFactQuestions[
                questionInStateIndex - 1
              ].answers.map((answer) => (
                <li
                  onClick={() => {
                    if (submit === "true") return;
                    setSubmitAttemptText("Lock In Answer");
                    addAnswer(
                      answer,
                      questionInStateIndex - 1,
                      questionData?.ethnicFactQuestions[
                      questionInStateIndex - 1
                      ]
                    );
                  }}
                  key={answer.id}
                  className={`mt-2 cursor-pointer p-[10px] rounded-[30px] ${submissionAnswerData.length > 0 &&
                      submissionAnswerData[questionInStateIndex - 1]
                        ?.answerOptionId === answer.id
                      ? answer.status === "CORRECT" && submit
                        ? "bg-[#007665]"
                        : "bg-[#BB5D06]"
                      : answer.status === "CORRECT" && submit
                        ? "bg-[#007665]"
                        : "bg-[#231F20]"
                    } text-white`}
                >
                  <span className="w-[30px] mr-20 inline-flex items-center justify-center h-[30px] text-white border border-white rounded-[100%]">
                    {answer.alias}
                  </span>
                  {answer.answer}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {!submit && (
          <button
            onClick={handleSubmitAttempt}
            disabled={!submissionAnswerData[questionInStateIndex - 1]}
            className="w-full p-4 mt-4 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906] disabled:bg-[#c7af9a]"
          >
            {submitAttemptText} <FaLock />
          </button>
        )}
        <div className="mt-6 gap-20 flex">
          {questionInStateIndex > 1 && (
            <button
              onClick={changeQuestionBackward}
              className="w-full p-4 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906]"
            >
              <FaArrowLeft /> Back
            </button>
          )}

          {questionInStateIndex < questionData?.ethnicFactQuestions.length && (
            <button
              disabled={!submissionAnswerData[questionInStateIndex - 1]}
              onClick={changeQuestionForward}
              className="w-full p-4 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906] disabled:bg-[#c7af9a]"
            >
              Next <FaArrowRight />
            </button>
          )}

          {submit !== "true"
            ? submissionAnswerData.length ===
            questionData?.ethnicFactQuestions.length &&
            questionInStateIndex ===
            questionData?.ethnicFactQuestions.length && (
              <button
                onClick={() => setIsQuizModalOpen(!isquizModalOpen)}
                className="w-full p-4 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906] disabled:bg-[#c7af9a]"
              >
                Submit <FaArrowRight />
              </button>
            )
            : null}
        </div>
      </div>
      <ReusableModal open={isquizModalOpen} setOpen={setIsQuizModalOpen}>
        <QuizSubmitModal
          questionsLength={questionData?.ethnicFactQuestions.length}
          setOpen={setIsQuizModalOpen}
        />
      </ReusableModal>
    </>
  );
};

export default QuestionCard;
