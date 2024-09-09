import React from "react";

function EmptyCard({ imgSrc, message }) {
  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <img src={imgSrc} alt="no note" className="w-60" />
      <p className="w-3/4 text-lg font-medium text-black text-center leading-8 mt-5 bg-gradient-to-r from-[#f5deb3] via-[#f0e5d8] to-[#d2b48c] p-4 rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:translate-y-1 hover:scale-105 hover:shadow-xl">
        {message}
      </p>
    </div>
  );
}

export default EmptyCard;
