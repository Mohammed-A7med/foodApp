import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Home from "./modules/Home/components/Home/Home";
import Header from "./modules/Shared/components/Header/Header";
import SideBar from "./modules/Shared/components/SideBar/SideBar";
import Navbar from "./modules/Shared/components/Navbar/Navbar";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";

function App() {
  const [userData, setUserData] = useState(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") || userData != null) {
      saveUserData();
    }
  }, []);

  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout userData={userData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "header", element: <Header /> },
        { path: "navbar", element: <Navbar /> },
        { path: "sideBar", element: <SideBar /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "recipesList", element: <RecipesList /> },
        { path: "usersList", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
