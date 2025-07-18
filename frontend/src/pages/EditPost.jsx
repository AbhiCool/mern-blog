import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverLinks, serverPath } from "../constants";
import axios from "axios";
import Editor from "../components/Editor";
import { toast } from "react-toastify";

const EditPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadPostDetails();
    async function loadPostDetails() {
      try {
        const res = await axios.get(serverLinks.postDetail + id, {
          withCredentials: true,
        });
        const data = res.data;
        console.log("data", data);
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleFieldChange = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (value) => {
    console.log("value", value);
    setFormData({ ...formData, content: value });
  };

  const handleFileFieldChange = (e) => {
    setFormData({ ...formData, image: e.target.files });
  };

  const updatePost = async (e) => {
    e.preventDefault();

    console.log(formData);

    const data = new FormData();
    data.set("title", formData.title);
    data.set("summary", formData.summary);
    data.set("content", formData.content);
    if (formData.image) {
      data.set("image", formData.image[0]);
    }

    const res = await axios.put(serverLinks.editPost + id, data, {
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

    navigate("/postDetail/" + id);
  };

  if (!formData) {
    return <h1>Loading..</h1>;
  }
  return (
    <form onSubmit={updatePost}>
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
      <img className="w-[200px] mb-[5px]" src={serverPath + formData.image} />
      <input type="file" name="image" id="" onChange={handleFileFieldChange} />
      <Editor
        name="content"
        value={formData.content}
        onChange={handleContentChange}
      />
      <button className="mt-[5px]">Update Post</button>
    </form>
  );
};

export default EditPost;
