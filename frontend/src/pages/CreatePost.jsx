import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { serverLinks } from "../constants";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
  });

  const handleFieldChange = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleFileFieldChange = (e) => {
    setFormData({ ...formData, image: e.target.files });
  };

  const createNewPost = async (e) => {
    e.preventDefault();

    console.log(formData);

    const data = new FormData();
    data.set("title", formData.title);
    data.set("summary", formData.summary);
    data.set("content", formData.content);
    data.set("image", formData.image[0]);

    const res = await axios.post(serverLinks.createPost, data, {
      withCredentials: true,
    });
    const response = res.data;
    console.log("response", response);
    toast.success(response.message);

    setFormData({
      title: "",
      summary: "",
      content: "",
      image: "",
    });

    e.target.reset();

    navigate("/");
  };
  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={formData.title}
        onChange={handleFieldChange}
      />
      <input
        type="text"
        name="summary"
        placeholder="summary"
        value={formData.summary}
        onChange={handleFieldChange}
      />
      <input type="file" name="image" id="" onChange={handleFileFieldChange} />
      <Editor
        name="content"
        value={formData.content}
        onChange={handleContentChange}
      />
      <button className="mt-[5px]">Create Post</button>
    </form>
  );
};

export default CreatePost;
