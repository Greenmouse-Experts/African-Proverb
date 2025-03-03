import useApiCall from "@/hooks/useCallApi";
import { getActiveUserPackage, getPackages } from "@/network/apiService";
import { addCommasToNumber, getUserId } from "@/utils";
import { useEffect, useContext } from "react";
import SelectLanguage from "../../styles/SelectLanguage.module.scss";
import Loader from "../reuse/loader";
import { AuthContext } from "@/context/authContext";


const SelectPlan = ({
  handleMoveToNextPage,
  handleSelectPlan,
  selectedPlan,
  setTypeofUpgrade,
  typeofUpdgrade,
  setcurrentPackageAmount,
  currentPackageAmount,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  const {
    data: currentPlan,
    loading: currentPlanLoading,
    error: currentPlanError,
  } = useApiCall(getActiveUserPackage, getUserId(), isAuthenticated);

  const {
    data: packageList,
    loading: newPlanLoading,
    error: newPlanError,
  } = useApiCall(getPackages, getUserId(), isAuthenticated);

  const activeState = (type) => {
    return type === typeofUpdgrade;
  };

  useEffect(() => {
    if (currentPlan && packageList) {
      const pkg = packageList.find(
        ({ name }) => name === currentPlan.subscription_name
      );
      if (pkg) setcurrentPackageAmount(pkg.amount);
    }
  }, [packageList, currentPlan, setcurrentPackageAmount]);

  const filterAccordingtoNameAndEthnicNumber = packageList.filter(
    (plan) =>
      plan.name !== currentPlan.subscription_name &&
      currentPlan.max_no_of_ethnic < plan.noOfEthnics
  );


  return (
    <div className="w-full">
      <div className="text-center">
        {currentPlanLoading ? (
          <Loader />
        ) : (
          <>
            {currentPlanError ? (
              <p className="text-sm text-red-500">
                An error occured while fetching current plan
              </p>
            ) : (
              <>
                {currentPlan === "User have no Active Subscription" ? (
                  <h1>
                    You have no Active Subscription <br /> Purchase a package
                    first before you upgrade
                  </h1>
                ) : (
                  <>
                    <h3 className="py-3 text-lg font-semibold">
                      Update your subscription
                    </h3>
                    <p className="py-2 text-sm text-gray-600">Current Plan:</p>
                    <div className="border current border-[#BB5D06] w-fit px-6 py-2 rounded-lg mx-auto bg-gray-200">
                      <input
                        type="radio"
                        value={currentPlan.subscription_name}
                        checked={true}
                        className="inline-block mr-4 cursor-pointer"
                      />
                      <label for="htmlFor" className="ml-4 ">
                        {currentPlan.subscription_name}
                        {currentPackageAmount &&
                          `$${addCommasToNumber(currentPackageAmount)}/annum`}
                      </label>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
        {currentPlan ===
          "User have no Active Subscription" ? null : filterAccordingtoNameAndEthnicNumber.length >
            0 ? (
          <p className="my-4 text-sm text-gray-600">Select new plan</p>
        ) : (
          <p className="my-4 text-sm text-gray-600">
            You are currently subscribed to the {currentPlan.subscription_name} plan,
            which stands as our top-tier offering, and there are no options available to upgrade to a different plan.
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {newPlanLoading && !currentPlan ? (
            <Loader />
          ) : (
            <>
              {newPlanError ? (
                <p className="text-sm text-red-500">
                  An error occured while fetching plans
                </p>
              ) : (
                filterAccordingtoNameAndEthnicNumber.map((plan) => (
                  <label
                    key={plan.id}
                    for="htmlFor"
                    className="text-xs text-gray-500 checked:bg-green-500 border border-[#BB5D06] w-fit px-4 py-1 rounded-lg flex items-center gap-1"
                  >
                    <input
                      type="radio"
                      value={plan.name}
                      checked={selectedPlan?.name === plan.name}
                      onChange={(e) => handleSelectPlan(plan)}
                      className=""
                    />
                    {plan.name} {`$${addCommasToNumber(plan.amount)}/annum`}
                  </label>
                ))
              )}
            </>
          )}
        </div>
      </div>
      {filterAccordingtoNameAndEthnicNumber.length > 0 && (
        <div className={SelectLanguage["pricing-options"]}>
          <div
            onClick={() => setTypeofUpgrade("DIFF")}
            className={SelectLanguage["pricing-option"]}
            style={{
              backgroundColor: activeState("DIFF") && "#ddd",
              border: activeState("DIFF") && "1px solid #666",
            }}
          >
            <div
              style={{
                backgroundColor: activeState("DIFF") && "#888",
                border: activeState("DIFF") && "2px solid #666",
              }}
            ></div>
            <p>Upgrade with differential price</p>

            <small className={`${activeState("DIFF") ? "block" : "hidden"}`}>
              you're charged based on the disparity between your current plan
              and the one you're upgrading to. It's important to note that this
              upgrade won't alter your expiration date; it remains unchanged.
            </small>
          </div>
          <div
            onClick={() => setTypeofUpgrade("FULL")}
            className={SelectLanguage["pricing-option"]}
            style={{
              backgroundColor: activeState("FULL") && "#ddd",
              border: activeState("FULL") && "1px solid #666",
            }}
          >
            <div
              style={{
                backgroundColor: activeState("FULL") && "#888",
                border: activeState("FULL") && "2px solid #666",
              }}
            ></div>
            <p>Upgrade with full package price</p>

            <small className={`${activeState("FULL") ? "block" : "hidden"}`}>
              A full package upgrade entails making a complete payment, and your
              expiration date commences upon upgrading to the higher package.
            </small>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between py-2 mt-8 border-t border-gray-300">
        <div>
          {selectedPlan && (
            <>
              <p className="text-[#BB5D06] text-sm flex items-center gap-1">
                <span>{selectedPlan?.name}</span>
                <span className="text-xl font-bold">
                  ${addCommasToNumber(selectedPlan?.amount)}
                </span>
                <span>/annum</span>
              </p>
              <span className="text-xs leading-none text-gray-400">
                Your preferred language without subsized commercials
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleMoveToNextPage}
          disabled={!selectedPlan && true}
          className="p-3 px-10 text-white rounded-md text-sm  bg-[#BB5D06] selected-button-disabled"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default SelectPlan;
