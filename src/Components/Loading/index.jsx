import { Spinner } from "@nextui-org/react";

function Loading() {
  return (
    <>
      <div>
        <Spinner label="Loading..." color="warning" />
      </div>
    </>
  );
}

export default Loading;
