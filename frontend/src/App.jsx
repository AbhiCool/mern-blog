import React from "react";
import "./App.css";
import Post from "./components/Post";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/postDetail/:id" element={<PostDetail />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
