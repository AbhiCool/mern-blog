import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { serverLinks } from "../constants";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  console.log("userInfo in header", userInfo);
  const handleLogout = () => {
    console.log("logout clicked");

    const url = serverLinks.logout;
    try {
      const res = axios.get(url, { withCredentials: true });
      navigate("/login");
      setUserInfo(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="flex justify-between mt-[20px] mb-[50px] items-center">
      <Link to="/" className="logo font-bold text-[1.5rem]">
        MyBlog
      </Link>
      <nav className="flex gap-[15px]">
        {userInfo ? (
          <>
            <h3>Hello, {userInfo.username}!</h3>
            <Link to="/create">Create New Post</Link>
            <a className="cursor-pointer" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
