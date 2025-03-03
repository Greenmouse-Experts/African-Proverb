const QuestionsBackground = ({ children }) => {
  return (
    <div className="flex  md:h-[100vh]">
      <div className="flex-1 bg-[#BB5D0614] bg-opacity-[0.8%] relative">
        <div className="absolute top-[40%] -translate-y-[35%] left-[20%]">
          <img className="" src="/img/transparent-map.png" alt="background" />
        </div>
      </div>
      <div className="hidden flex-1 md:flex bg-white"></div>
      <div className=" hidden lg:block absolute top-[0%] right-0">
        <img className="" src="/img/culture.svg" alt="background" />
      </div>
      <div className="top-0 w-full h-full absolute">{children}</div>
    </div>
  );
};

export default QuestionsBackground;
