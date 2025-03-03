import {
  getQuestionsByBatchId,
  submitQuizByBatch,
} from "@/network/quizService";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QuizContext } from "../quizContext";

const QuizProvider = ({ children }) => {
  const [questionData, setQuestionData] = useState(null);
  const [batchID, setBatchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissionAnswerData, setsubmissionAnswerData] = useState([]);
  const [questionInStateIndex, setQuestionInStateIndex] = useState(1);
  const [submitLoader, setsubmitLoader] = useState(false);
  const router = useRouter();

  const addAnswer = (answer, index, question) => {
    const newArray = [...submissionAnswerData];
    newArray[index] = {
      answerOptionId: answer.id,
      ethnicFactQuestionId: question.ethnicfactQuestionId,
    };
    setsubmissionAnswerData(newArray);
  };

  function fetchQuestions(id) {
    getQuestionsByBatchId(id)
      .then(({ data }) => {
        setQuestionData(data[0]);
      })
      .catch((e) => {
        toast.error("an error occured fetching questions");
        router.push(`/quiz`);
      })
      .finally(() => {
        setsubmitLoader(false);
        setIsLoading(true);
      });
  }

  async function handleSubmitQuiz() {
    setQuestionInStateIndex(1)  
    setsubmissionAnswerData([])
    router.push(`/quiz/${questionData.batchId}/submit/`);
  }

  useEffect(() => {
    if (!batchID) return;
    fetchQuestions(batchID);
  }, [batchID]);

  return (
    <QuizContext.Provider
      value={{
        questionData,
        setBatchId,
        isLoading,
        addAnswer,
        submissionAnswerData,
        questionInStateIndex,
        setQuestionInStateIndex,
        handleSubmitQuiz,
        submitLoader,
        setsubmissionAnswerData,
        setQuestionData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
