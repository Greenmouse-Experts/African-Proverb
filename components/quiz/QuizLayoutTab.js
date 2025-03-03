const QuizLayoutTab = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-5 sm:gap-10  mt-5 md:mt-10 mx-auto justify-center w-11/12 lg:w-[900px] p-2 md:p-4 rounded-[5px] bg-[#BFBFBF40]">
      {tabs.map(({ name }) => (
        <div
          key={name}
          onClick={() => setActiveTab(name)}
          className={`p-1 flex items-center justify-center md:px-4 lg:py-2 transition-all cursor-pointer rounded-[5px] ${
            name === activeTab ? "bg-[#BB5D06]" : "none"
          }`}
        >
          <h3
            className={`font-bold text-center text-[10px] sm:text-[14px] lg:text-[18px] transition-all ${
              name === activeTab ? "text-white" : "text-[#BB5D06]"
            }`}
          >
            {name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default QuizLayoutTab;
