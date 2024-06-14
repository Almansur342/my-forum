import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Statistics from "../Pages/Dashboard/Common/Statistics";
import MyProfile from "../Pages/Dashboard/Guest/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/Guest/AddPost/AddPost";
import MyPost from "../Pages/Dashboard/Guest/MyPost/MyPost";
import MyComments from "../Pages/Comments/MyComments";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
export const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path:'/my-comments',
        element:<MyComments></MyComments>
      }
    ]
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    errorElement:<ErrorPage></ErrorPage>,
   children:[
    {
      index:true,
      element:<Statistics></Statistics>
    },
    {
      path: 'myProfile',
      element:<MyProfile></MyProfile>
    },
    {
      path: 'add-post',
      element:<AddPost></AddPost>
    },
    {
      path: 'my-post',
      element:<MyPost></MyPost>
    },
    {
      path:'manage-users',
      element:<ManageUsers></ManageUsers>
    },
   ]
  }
]);