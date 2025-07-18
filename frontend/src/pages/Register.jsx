import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { serverLinks } from "../constants";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const url = serverLinks.register;
    try {
      const res = await axios.post(url, formData);
      const data = res.data;
      console.log("data", data);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="register max-w-[400px] mx-auto"
    >
      <h1 className="text-center text-2xl my-2 font-bold">Register</h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        className=""
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
