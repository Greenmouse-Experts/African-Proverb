import { getResultsByBatchId } from "@/network/quizService";
import { data } from "autoprefixer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../reuse/loader";

const SubmitQuestion = () => {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    setIsLoading(true)
    getResultsByBatchId(id)
      .then(({ data }) => {
        setResultData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("an error occured fetching results");
        router.push(`/quiz`);
      })
  }, [id]);

  return (
    <div className="max-w-[600px] bg-[url('/img/transparent-map2.png')] bg-center bg-no-repeat  h-[100vh] mt-20 mx-auto">
      {isLoading  ? (
        <Loader />
      ) : (
        <div className="w-11/12 mx-auto">
          <div className="flex justify-center">
            <img
              className="rounded-3xl object-cover w-[50px] h-[50px] "
              src={`/img/submiticon.svg`}
              alt="hello"
              width={30}
              height={30}
            />
          </div>
          <div className="my-6">
            <h1 className="text-center leading-7 text-3xl font-bold">
              Welldone for giving your best!
            </h1>

            <div className="border  my-4  rounded-lg border-[#858585]">
              <table className="w-full p-1">
                <thead class="text-xs border-b border-[#858585]  ">
                  <tr>
                    <td scope="col" class="p-2 text-lg text-center">
                      Result
                    </td>
                    <td scope="col" class="p-2  text-lg text-center">
                      Question(s)
                    </td>
                    <td scope="col" class="p-2 text-lg text-center">
                      Actions
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="">
                    <td class="p-2 text-lg text-center flex items-center justify-center">
                      <img
                        className=" w-[20px] h-[20px] "
                        src={`/img/greencheck.svg`}
                        alt="hello"
                      />
                      Passed
                    </td>
                    <td class="p-2 text-lg  text-center ">  { resultData?.correctAnswers}</td>
                    <td class="p-2 text-lg text-[#BB5D06] text-center flex justify-center items-center">
                      <Link className="flex items-center" href={`/quiz/${resultData?.batchHeaderId}?submit=true`} >view answers <FaArrowRight /></Link>
                    </td>
                  </tr>
                  <tr class="">
                    <td class="p-2 text-lg text-center flex items-center justify-center">
                      <img
                        className=" w-[20px] h-[20px] "
                        src={`/img/cancel.svg`}
                        alt="hello"
                      />
                      Failed
                    </td>
                    <td class="p-2 text-lg  text-center ">{ resultData?.wrongAnswers}</td>
                    <td class="p-2 text-lg text-[#BB5D06] text-center flex justify-center items-center">
                    <Link className='flex items-center' href={`/quiz/${resultData?.batchHeaderId}?submit=true`} >view answers <FaArrowRight /></Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex my-6 justify-center">
            <h3 className="bg-white text-3xl border border-[#BB5D06] inline-flex rounded-[30px] p-4  font-medium ">
              knowledge check:
            </h3>
          </div>
          <div className="border  my-4 mb-12 rounded-lg border-[#858585]">
            <table className="w-full p-1">
              <thead class="text-xs border-b border-[#858585]  ">
                <tr>
                  <td scope="col" class="p-2 text-lg text-center">
                    Passing Point{" "}
                  </td>
                  <td scope="col" class="p-2  text-lg text-center">
                    Your Point{" "}
                  </td>
                  <td scope="col" class="p-2 text-lg text-center">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr class="">
                  <td class="p-2 text-lg text-center flex items-center justify-center">
                      { resultData?.passingPoint}
                  </td>
                  <td class="p-2 text-lg  text-center "> { resultData?.scoredPoint}</td>
                  <td class="p-2 text-lg text-center flex justify-center items-center">
                    <img
                      className=" w-[20px] h-[20px] "
                      src={`/img/greencheck.svg`}
                      alt="hello"
                    />
                    {resultData?.remark === "PASSED" ? 'Passed' : 'Failed'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link
            href={`/quiz`}
            className="w-full p-2 flex gap-2 items-center justify-center rounded-[5px] text-white bg-[#BB5906]"
          >
            Close Quiz
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubmitQuestion;
