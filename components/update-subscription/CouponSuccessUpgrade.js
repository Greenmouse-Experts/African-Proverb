import Button from "@/components/reuse/button";
import SuccessIcon from "@/public/img/success-icon.png";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";

const CouponSuccessUpgrade = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full md:min-h-[500px]  md:min-w-[500px]">
      <div className="flex flex-col items-center justify-center">
        <Image src={SuccessIcon} alt="Success Icon" />
        <Typography
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Upgrade Successful <br></br>
        </Typography>
        <Button
          textInput={"Go To Your Profile"}
          type="submit"
          onClick={() => router.push("/profile")}
        />
      </div>
    </div>
  );
};

export default CouponSuccessUpgrade;
