import React from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout({ userData }) {
  console.log(userData?.userName);
  return (
    <>
      <div className="d-flex">
        <div className="">
          <SideBar userData={userData} />
        </div>
        <div className="w-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
