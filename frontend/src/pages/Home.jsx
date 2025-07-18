import React, { useEffect, useState } from "react";
import Post from "../components/Post";

import { serverLinks } from "../constants";
import axios from "axios";

const Home = () => {
  const [postData, setPostData] = useState([]);
  console.log("postData", postData);

  useEffect(() => {
    loadPosts();
    async function loadPosts() {
      try {
        const res = await axios.get(serverLinks.getPosts);

        const data = res.data;
        setPostData(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <>
      {postData.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
    </>
  );
};

export default Home;
