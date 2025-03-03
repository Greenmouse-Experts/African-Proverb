import React from "react";

const AddressInfo = ({ address }) => {
  return (
    <>
      <div>
        <label htmlFor="Country" className="text-gray-500">
          Country
        </label>
        <p className="mt-2">{address?.data?.country}</p>
      </div>
      <div>
        <label htmlFor="State" className="text-gray-500">
          State
        </label>
        <p className="mt-2">{address?.data?.state}</p>
      </div>
      <div>
        <label htmlFor="City" className="text-gray-500">
          City
        </label>
        <p className="mt-2">{address?.data?.city}</p>
      </div>
      <div>
        <label htmlFor="Street" className="text-gray-500">
          Street
        </label>
        <p className="mt-2">{address?.data?.street}</p>
      </div>

      <div>
        <label htmlFor="House Number" className="text-gray-500">
          House Number
        </label>
        <p className="mt-2">{address?.data?.homeNumber}</p>
      </div>
      <div>
        <label htmlFor="Postal Code" className="text-gray-500">
          Postal Code
        </label>
        <p className="mt-2">{address?.data?.postalCode}</p>
      </div>
    </>
  );
};

export default AddressInfo;
