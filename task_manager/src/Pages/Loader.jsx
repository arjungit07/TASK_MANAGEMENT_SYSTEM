import React from 'react'

const Loader = () => {
  return (
    <div
      className={`fixed top-0 left-0 bg-gray-800 opacity-90 h-screen w-full`}
    >
      <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-400"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-600"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader