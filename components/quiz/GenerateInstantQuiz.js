import React, { useEffect, useContext, useState } from "react";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";

import { fetchallQuestions } from "@/network/quizService";
import { ProfileContext } from "@/context/profileContext";
import { CreateInstantQuiz } from "@/network/quizService"; // Import the function for creating instant quiz



const GenerateInstantQuiz = () => {
    const [question, setQuestion] = useState("");
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const { fullDetails } = useContext(ProfileContext);

    const page = 1;
    const size = 10;

    useEffect(() => {
        fetchallQuestions(page, size)
            .then((data) => {
                const defaultQuestion = data?.data?.data?.content?.find(
                    (q) => q.isDefault === true
                );
                setQuestion(defaultQuestion);
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
            });
    }, []);

    const handleSubmit = () => {
        const payload = {
            questionPropertId: question.id,
            userId: fullDetails.data.id,
        };

        setLoading(true);
        CreateInstantQuiz(payload)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Instant Quiz Generated Successfully!")
                }
                setLoading(false);
                router.push("/quiz")
            })
            .catch((error) => {
                setLoading(false)
                toast.error("Failed to Generate Instant Quiz. Please try again.");
            })

    };

    return (
        <>
            <div className="w-[400px]">
                <label htmlFor="questionPropertId" className="block mb-2">
                    Question Available:
                </label>
                <div className="bg-gray-100 p-2 rounded-md mb-4">{question.name}</div>
            </div>

            <button
                type="button"
                className="bg-[#BB5D06] text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
                disabled={!question || loading}
            >
                {loading ? "Generating..." : "Generate Now"}
            </button>
        </>
    );
};

export default GenerateInstantQuiz;
