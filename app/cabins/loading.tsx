import React from "react";
import Spinner from "../_components/Spinner";

const Loading = () => {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p>The cabins loading...</p>
    </div>
  );
};

export default Loading;
