import CustomErrorPage from "@/components/error/errorpage";

function Error({ statusCode }) {
  return (
    <p>
      {statusCode ? (
        `An error ${statusCode} occurred on server`
      ) : (
        <CustomErrorPage />
      )}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
