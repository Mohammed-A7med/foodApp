import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../../assets/Imges/3.png";

export default function SideBar() {

  const [isCollapse , setIsCollapse] = useState(false);

  const toggleCollaspe = () =>{
    setIsCollapse(!isCollapse)
  }

  return (
    <div className="sidebarContainer">
      <Sidebar className="border-0" collapsed={isCollapse}>
        <Menu>
          <MenuItem
            onClick={toggleCollaspe}
            className="firstMenuItem mt-5 mb-4 ms-1"
            icon={<img src={logo} alt="logo" />}
            component={<Link to="/dashboard" />}
          ></MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-user-group"></i>}
            component={<Link to="/dashboard/usersList" />}
          >
            {" "}
            Users
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-columns"></i>}
            component={<Link to="/dashboard/recipesList" />}
          >
            {" "}
            Recipes
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-calendar-days"></i>}
            component={<Link to="/dashboard/categoriesList" />}
          >
            {" "}
            Categories
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-unlock-keyhole"></i>}
            component={<Link to="/forgetPass" />}
          >
            {" "}
            Change Password
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>}>
            {" "}
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
