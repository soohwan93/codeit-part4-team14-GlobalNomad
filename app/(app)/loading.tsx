import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <div className="flex h-screen items-center justify-center space-x-2 bg-white dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-nomad-black"></div>
      </div>
    </div>
  );
};

export default loading;
