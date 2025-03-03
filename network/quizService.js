import { getCurrentDate } from "@/utils/utilities";
import HttpService from "./httpService";

export const getActiveQuizes = () => {
  const currentDate = getCurrentDate()
  const http = new HttpService();
  const url = `/quiz-batch/user/week?currentDate=${currentDate}`;
  return http.getData(url);
};

export const getInstantActiveQuizes = () => {
  const currentDate = getCurrentDate()
  const http = new HttpService();
  const url = `/quiz-batch/user/week-gen-source?currentDate=${currentDate}`;
  return http.getData(url);
};

export const getQuestionsByBatchId = (id) => {
  const http = new HttpService();
  const url = `/api/quiz/all/${id}`;
  return http.getData(url);
};

export const submitQuizByBatch = (payload) => {
  const http = new HttpService();
  const url = `/quiz_attempt/submit`;
  return http.postData(payload, url);
};

export const getResultsByBatchId = (id) => {
  const http = new HttpService();
  const url = `/quiz_attempt/calculate/${id}`;
  return http.getData(url);
};

export const SubmitAnswerForQuestion = (payload) => {
  const http = new HttpService();
  const url = `/quiz_attempt/submit-single`;
  return http.postData(payload, url);
};

export const getInitialAnswerForQuestion = (ethnicFactQuestionId, quizId) => {
  const http = new HttpService();
  const url = `/api/quiz/answer/${ethnicFactQuestionId}/${quizId}`;
  return http.getData(url);
};

export const fetchallQuestions = (page, size) => {
  const http = new HttpService();
  const url = `/api/questionProperty/all?page=${page}&size=${size}`;
  return http.getData(url);
};


export const CreateInstantQuiz = (payload) => {
  const { userId, questionPropertId } = payload;
  const genSource = "USER";
  const http = new HttpService();
  const url = `/api/quiz/${userId}/${questionPropertId}/${genSource}`;
  return http.postData(payload, url);
};



// export const getEthnicflagOrSymbol = (ethnicFactQuestionId) => {
//   const http = new HttpService();
//   const url = `/api/quiz/questionWithSymbolsOrFlags/${ethnicFactQuestionId}`;
//   return http.getEthnicImageData(url)
// };

export const getRecentQuizes = () => {
  const http = new HttpService();
  const url = `/quiz-batch/user/recent/all`;
  return http.getData(url);
};


export const updateAttempts = (batchId) => {
  const http = new HttpService();
  const url = `/quiz-batch/update_attempt/${batchId}`
  return http.getData(url);
}