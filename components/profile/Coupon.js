const { useState } = require("react");
import { BsFileEarmarkCheck } from "react-icons/bs";
import { MdOutlineFileCopy } from "react-icons/md";
import { convertToHumanReadableDate } from "@/utils";

const Coupon = ({ couponCode, dateIssued, expiryDate, status }) => {
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  const handleCopyClick = (text) => {
    setIsCopyClicked(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsCopyClicked(false);
    }, 2000);
  };

  return (
    <>
      <div className="border border-gray-100 p-4 mb-4 md:mb-10 rounded-[1rem]">
        <div className="flex items-center">
          <h3 className="text-sm text-gray-400 font-medium">Coupon Code:</h3>
          <h3 className="font-bold gap-2 ml-2 relative text-gray-500 flex items-center">
            <span
              onClick={() => handleCopyClick(couponCode)}
              className="cursor-pointer flex items-center"
            >
              {isCopyClicked ? (
                <BsFileEarmarkCheck className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <MdOutlineFileCopy className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </span>
            <span className="text-gray-700 text-lg md:text-3xl">{couponCode}</span>
            {status === "ACTIVE" && (
              <span className="text-[8px] md:text-[9px] flex-start px-1 mx:px-2 py-1 rounded-xl bg-green-100 font-medium border border-green-200 text-green-600">
                Active
              </span>
            )}
          </h3>
        </div>
        <div className="flex flex-col md:flex-row md:gap-10 mt-2">
          <div className="flex items-center">
            <h3 className="text-sm text-gray-400 font-medium">Date Issued:</h3>
            <h3 className="font-bold gap-2 ml-2 relative text-gray-600 flex items-center">
              {convertToHumanReadableDate(dateIssued)}
            </h3>
          </div>
          <div className="flex items-center">
            <h3 className="text-sm text-gray-400 font-medium">Expiry Date:</h3>
            <h3 className="font-bold ml-2 relative text-gray-600 flex items-center">
              {convertToHumanReadableDate(expiryDate)}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
