// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import image from "/media/nobita/New Volume/Project/konect/frontend/src/uploads/1740397323815.jpg"
// import Tags from "./Tags";
// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const tags = 
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/v1/posts");
//         console.log("Fetched Post:", response.data); // ✅ Logs post data
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (!posts) {
//     return <p className="text-center text-gray-600">Loading post...</p>;
//   }

//   return (
//     <div className="space-y-6 mt-3">
//       {posts.map((post, index) => (
//         <div
//           key={index} // Ensure each post has a unique key
//           className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
//         >
//           {/* Title */}
//           <div className="p-4">
//             <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
//           </div>
//           <Tags text={"technology"}/>
//           {/* Body */}
//           <div className="px-4 pb-4">
//             <p className="text-gray-600">{post.body}</p>
//           </div>

//           {/* Check if `post.image` exists before rendering */}
//           {post.image && (
//             <div className="w-full p-1">
//               <img
//                 src={image} // Use the correct image path
//                 alt={post.title}
//                 className="w-full h-56 object-cover"
//                 onError={(e) => {
//                   console.error("Image failed to load:", e.target.src);
//                   e.target.src = "/path/to/placeholder/image.jpg"; // Fallback image
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   )};

// export default Post;
