import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";

const Loader = () => {
  return (
    <div className="w-full flex justify-center ">
      <CircularProgress
        size="sm"
        variant="solid"
        color="warning"
        determinate={false}
      />
    </div>
  );
};

export default Loader;
