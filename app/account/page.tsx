"use client";
import React, { useEffect } from "react";

const Account = () => {
  const [data1, setData] = React.useState<any>(null);
  const fetchData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const data = await response.json();
    return data;
  };
  let add: any;
  useEffect(() => {
    fetchData().then((result) => (add = result));
  }, []);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome Imon
    </h2>
  );
};

export default Account;
