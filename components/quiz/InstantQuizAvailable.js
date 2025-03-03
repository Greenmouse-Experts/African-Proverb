import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { toast } from "react-toastify";
import { getInstantActiveQuizes } from "@/network/quizService";
import Loader from "../reuse/loader";

const InstantQuizAvailable = () => {
  const [instantQuizes, setInstantQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getInstantActiveQuizes()
      .then(({ data: { data } }) => {
        setInstantQuizes(data);
        console.log(data)
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error("An error occured fetching Instant quizes");
      });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="col-span-3 flex justify-center">
          <Loader />
        </div>
      ) : !(instantQuizes.length > 0) ? (
        <h2 className="col-span-3 text-[#777] flex justify-center font-bold text-lg lg:text-2xl">
          You have no Instant Quizes for the week{" "}
        </h2>
      ) : (
        <>
          <h1 className="my-10 text-2xl font-bold text-gray-600 text-center">Your Insant Quizzes for the Week</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
            {instantQuizes.map((quiz, index) => {
              return <QuizCard key={quiz.id} quiz={quiz} index={index} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default InstantQuizAvailable;
