import React from "react";

export default function page() {
  return (
    <body className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-zoom bg-[url('https://picsum.photos/1600/900')] bg-cover bg-center bg-no-repeat"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-zinc-850/80 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full transition duration-500 hover:scale-105">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-gray-700 text-base md:text-lg">You&apos;re looking at a fully responsive, animated, blurred background interface.</p>
        </div>
      </div>
    </body>
  );
}
