
const QuestionProgress = ({ questionInStateIndex, total }) => {
  return (
    <div className="h-[5px] w-full rounded-lg bg-[#FFEDDB]">
      {questionInStateIndex && (
        <div
          style={{ width: `${(questionInStateIndex / total) * 100}%` }}
          className={`h-[5px] rounded-tl-lg rounded-bl-lg bg-[#BB5D06]`}
        ></div>
      )}{" "}
    </div>
  );
};

export default QuestionProgress;
