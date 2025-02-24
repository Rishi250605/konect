import React from 'react';

export default function Sidebar() {
  return (
    <div className="bg-white text-black w-72 h-screen  shadow-lg  top-0 left-0 p-4 flex flex-col gap-4 m-[2px]">
      {["Home", "Profile", "Messages", "Settings", "Logout"].map((item, index) => (
        <div key={index} className="bg-gray-100 p-4 mt-2 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition">
          {item}
        </div>
      ))}
    </div>
  );
}
