import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App p-[10px] max-w-[960px] mx-auto my-0 text-[#333]">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
