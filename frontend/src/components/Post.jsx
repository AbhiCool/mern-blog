import React from "react";
import { format, formatISO9075 } from "date-fns";
import { serverPath } from "../constants";
import { Link } from "react-router-dom";
const Post = ({ _id, image, summary, title, content, createdAt, author }) => {
  return (
    <div
      className="post grid 
    grid-cols-[1fr]
    sm:grid-cols-[.9fr_1.1fr]
    mb-[30px] gap-[20px]"
    >
      <div className="image">
        <Link to={"/postDetail/" + _id}>
          <img src={serverPath + image} alt="" className="" />
        </Link>
      </div>

      <div className="texts">
        <Link to={"/postDetail/" + _id}>
          <h2 className="text-[1.8rem]">{title}</h2>
        </Link>
        <p className="info text-[#888] text-[0.7rem] mt-[6px] font-bold flex gap-[10px]">
          <a href="" className="author text-[#333]">
            {author.username}
          </a>

          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary my-[10px] leading-[1.4rem]">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
