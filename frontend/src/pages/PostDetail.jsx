import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { serverLinks, serverPath } from "../constants";
import axios from "axios";
import { format, formatISO9075 } from "date-fns";
import { AuthContext } from "../context/AuthProvider";
import { FaEdit } from "react-icons/fa";

const PostDetail = () => {
  const { id } = useParams();
  const { username } = useContext(AuthContext);

  const [postDetails, setPostDetails] = useState(null);
  useEffect(() => {
    loadPostDetails();
    async function loadPostDetails() {
      try {
        const res = await axios.get(serverLinks.postDetail + id, {
          withCredentials: true,
        });
        const data = res.data;
        console.log("data", data);
        setPostDetails(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  if (!postDetails) return "";

  return (
    <div className="post-page">
      <h1 className="text-4xl font-bold mt-[10px] mb-[5px] text-center">
        {postDetails.title}
      </h1>
      <time className="text-center block text-[0.7rem] text-[#aaa]">
        {formatISO9075(postDetails.createdAt)}
      </time>
      <div className="author text-center mb-[20px] text-[0.7rem] font-bold">
        by @{postDetails.author.username}
      </div>
      {id === postDetails._id && (
        <div className="edit-row text-center mb-[20px]">
          <Link
            to={"/edit/" + id}
            className="edit-btn bg-[#333] text-[#fff] py-[15px] px-[30px] inline-flex items-center gap-[5px] rounded-[5px]"
            href=""
          >
            <FaEdit className="inline-block" />
            Edit this post
          </Link>
        </div>
      )}

      <div className="image max-h-[200px] flex overflow-hidden">
        <img
          className="object-cover object-center"
          src={serverPath + postDetails.image}
          alt=""
        />
      </div>

      <div
        className="content text-lg text-gray-500"
        dangerouslySetInnerHTML={{ __html: postDetails.content }}
      />
    </div>
  );
};

export default PostDetail;
