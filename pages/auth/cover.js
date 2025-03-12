import { useState } from 'react';
import Link from "next/link";
import { User, Briefcase } from 'lucide-react';

export default function RegisterPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const texts = [
        "Explore the Richness of African Proverbs",
        "Discover Proverbs from Various Cultures",
        "Wisdom, Unity, and Perseverance in Words"
    ];

    return (
        <div className="flex h-screen w-full">
            {/* Left Side */}
            <div className="w-1/2 bg-[#BB5D06] flex flex-col items-center justify-center text-white p-10">
                <div className="relative mb-8">
                    <Link href="/">
                        <img
                            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741078619/We-Immersive/africa-logo.cc06fc01_vkfvjj.png"
                            alt="African Art"
                            className="w-72 h-72 object-contain"
                        />
                    </Link>
                </div>
                <h2 className="text-3xl font-bold mb-4">{texts[activeIndex]}</h2>
                <p className="text-center max-w-lg leading-loose">
                    Dive into a treasure trove of ancient wisdom and explore a wide range of African proverbs from various regions and ethnic groups. Discover proverbs that reflect the values, beliefs, and traditions of Africa, spanning themes like wisdom, love, unity, perseverance, and much more.
                </p>
                <div className="mt-4 flex space-x-2">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`w-5 h-1 rounded-full cursor-pointer ${activeIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                            onClick={() => setActiveIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
                <div className="mb-4">
                    <Link href="/">
                        <img
                            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg"
                            alt="African Proverbs Logo"
                            className="h-20 mx-auto"
                        />
                    </Link>
                </div>
                <h2 className="text-xl font-semibold mb-6">Create an Account</h2>
                <Link href={"/auth/non-corporate"}>
                    <button className="w-80 p-4 border rounded-lg flex flex-col items-center text-lg mb-6 hover:bg-gray-100">
                        <User size={32} className="text-[#BB5D06] mb-2" />
                        Register as <br /> Non-Corporate Client
                    </button>
                </Link>

                <Link href={"/auth/corporate-signup"}>
                    <button className="w-80 p-4 border rounded-lg flex flex-col items-center text-lg hover:bg-gray-100">
                        <Briefcase size={32} className="text-[#BB5D06] mb-2" />
                        Register as
                        <br />a Corporate Client
                    </button>
                </Link>
                <p className="mt-6 text-gray-600">
                    Already have an account? <a href="#" className="text-[#BB5D06] font-semibold">Sign in</a>
                </p>
            </div>
        </div>
    );
}
