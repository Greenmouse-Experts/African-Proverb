import AvailableQuizes from "@/components/quiz/AvailableQuiz";
import InstantQuizAvailable from "@/components/quiz/InstantQuizAvailable";
import LeaderBoard from "@/components/quiz/LeaderBoard";
import QuizLayoutTab from "@/components/quiz/QuizLayoutTab";
import QuizLayoutTabView from "@/components/quiz/QuizLayoutTabView";
import RecentlyAttempted from "@/components/quiz/RecentlyAttempted";
import AuthLayout from "@/components/reuse/auth_Layout";
import { QuizContext } from "@/context/quizContext";
import { useContext, useEffect, useState } from "react";
import CustomAds from "@/components/customads";

const QuizPage = () => {
  const { setQuestionInStateIndex,setsubmissionAnswerData } = useContext(QuizContext);
  const tabs = [
    {
      name: "Available Quiz",
      component: <AvailableQuizes />,
    },
    {
      name: "Instant Quiz",
      component: <InstantQuizAvailable />,
    },
    {
      name: "Recently Attempted",
      component: <RecentlyAttempted />,
    },
    {
      name: "Leader Board",
      component: <LeaderBoard />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const activeView = tabs.find(({ name }) => name === activeTab);

  useEffect(() => {
    localStorage.removeItem('attempts')
    setQuestionInStateIndex(1);
    setsubmissionAnswerData([]);
  }, []);

  return (
    <AuthLayout>
      <main className="w-[95%] lg:w-11/12 mx-auto">
        <QuizLayoutTab
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <QuizLayoutTabView view={activeView.component} />
      </main>
      <CustomAds />
    </AuthLayout>
  );
};

export default QuizPage;
