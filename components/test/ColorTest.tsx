import React from "react";

type Props = {};

const ColorTest = (props: Props) => {
  return (
    <div className="my-20 flex justify-center gap-7 text-center">
      <div>
        <div className="bg-black text-white">black</div>
        <div className="bg-nomad-black text-white">nomad-black</div>
        <div className="bg-gray-80 text-white">gray-80</div>
        <div className="bg-gray-70 text-white">gray-70</div>
        <div className="bg-gray-60 ">gray-60</div>
        <div className="bg-gray-50">gray-50</div>
        <div className="bg-gray-40">gray-40</div>
        <div className="bg-gray-30">gray-30</div>
        <div className="bg-gray-20">gray-20</div>
        <div className="bg-gray-10">gray-10</div>
      </div>
      <div>
        <div className="bg-green-20 text-white">green-20</div>
        <div className="bg-green-10">green-10</div>
      </div>
      <div>
        <div className="bg-red-20 ">red-20</div>
        <div className="bg-red-10">red-10</div>
      </div>
      <div>
        <div className="bg-orange-20 ">orange-20</div>
        <div className="bg-orange-10">orange-10</div>
      </div>
      <div>
        <div className="bg-yellow ">yellow</div>
      </div>
      <div>
        <div className="bg-blue-30">blue-30</div>
        <div className="bg-blue-20">blue-20</div>
        <div className="bg-blue-10">blue-10</div>
      </div>
    </div>
  );
};

export default ColorTest;
