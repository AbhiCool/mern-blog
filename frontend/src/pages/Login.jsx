import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverLinks } from "../constants";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const { setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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

    const url = serverLinks.login;
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
      });
      const data = res.data;
      console.log("data", data);
      setUserInfo({ id: data.user._id, username: data.user.username });
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="login max-w-[400px] mx-auto">
      <h1 className="text-center text-2xl my-2 font-bold">Login</h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
