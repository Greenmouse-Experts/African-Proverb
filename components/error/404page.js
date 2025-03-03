import AuthLayout from "@/components/reuse/auth_Layout";
import Button from "@/components/reuse/button";
import Barricade from "@/public/img/404-barricade.png";
import Logo from "@/public/img/404-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Custom404Page() {
  return (
    <AuthLayout>
      <div className="flex justify-center items-center flex-col w-full h-full p-5">
        <Image
          height={"auto"}
          width={400}
          src={Logo}
          alt={"African Proverb Logo"}
        ></Image>
        <div className="flex justify-center items-center flex-col w-full h-full w-10 px-5">
          <h2 className="text-2xl font-bold m-5 text-center">Opps! We can’t find this page.</h2>

          <p className="w-72 px-5 text-center text-xs">
            We’re sorry, the page you have looked for doe not exist in our
            database! Maybe go to our home page or try to use a search?
          </p>
        </div>
        <div className="mb-10 mt-10">
          <Link href={"/"}>
            <Button textInput="Go back To Home" />
          </Link>
        </div>

        <Image
          className="mb-20"
          height={"auto"}
          width={800}
          src={Barricade}
          alt={"African Proverb Logo"}
        ></Image>
      </div>
    </AuthLayout>
  );
}
