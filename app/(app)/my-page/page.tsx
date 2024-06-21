import MyInfo from "@/components/my-page/MyInfo";
import { getUser } from "@/util/api";
import React from "react";

const page = async () => {
  const data = await getUser();
  return (
    <section className="m-auto mt-6 w-[90%] sm:w-[400px]">
      <MyInfo data={data} />
    </section>
  );
};

export default page;
