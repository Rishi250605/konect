import React from "react";

const postData = {
  title: "Exploring Web3 Technologies",
  community: "Blockchain Enthusiasts",
  tag: "Web3",
  content: "Web3 is revolutionizing the internet by introducing decentralization, blockchain, and smart contracts.",
  image: "https://via.placeholder.com/600x400",
  username: "tech_guru"
};

const PostCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl mx-auto space-y-4 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-900">{postData.title}</h2>
        <span className="text-gray-500 text-sm font-medium">@{postData.username}</span>
      </div>
      {/* Community & Tag */}
      <div className="text-gray-600 text-sm space-y-1">
        <p className="font-medium">Community: <span className="text-gray-800 font-semibold">{postData.community}</span></p>
        <p className="bg-gray-100 inline-block px-3 py-1 rounded-md text-xs font-semibold text-gray-700">#{postData.tag}</p>
      </div>
      {/* Content */}
      <p className="text-gray-800 text-base leading-relaxed">{postData.content}</p>
      {/* Image */}
      {postData.image && <img src={postData.image} alt="Post" className="mt-4 w-full rounded-lg shadow-md" />}
    </div>
  );
};

export { PostCard};
