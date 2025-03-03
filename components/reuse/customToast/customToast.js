
const CustomToast = ({ title, status, duration }) => {
  const toast =
    status === "error"
      ? toast.error(
          { title },
          {
            autoClose: { duration },
            theme: "dark",
          }
        )
      : status === "success"
      ? toast.success(
          { title },
          {
            autoClose: { duration },
            theme: "dark",
          }
        )
      : null;
  return { toast };
};

export default CustomToast;
