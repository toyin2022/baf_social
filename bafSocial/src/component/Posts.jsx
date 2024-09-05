import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
const Posts = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    axios
      .get("https://baf-social.onrender.com/posts/all")
      .then((response) => {
        setposts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(posts);

  return (
    <div className="flex items-center justify-center flex-col">
      {posts.map((post, index) => (
        <div key={post?._id || index}>
          <Post content={post.content} image={post.image} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
