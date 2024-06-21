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
import PrivateRoute from './PrivateRoute';
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import PostDetails from "../Pages/PostDetails/PostDetails";
import ManageReport from "../Pages/Dashboard/Admin/ManageReport";
import Membership from "../Pages/Membership/Membership";
import Anouncement from "../Pages/Anouncement/Anouncement";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/details/:id',
        element: <PrivateRoute>
          <PostDetails></PostDetails>
        </PrivateRoute>
      },
      {
        path: '/my-comments/:post_title',
        element: <PrivateRoute><MyComments></MyComments></PrivateRoute>
      },
      {
        path: '/membership',
        element: <PrivateRoute><Membership></Membership></PrivateRoute>
      },
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Statistics></Statistics></PrivateRoute>
      },
      {
        path: 'myProfile',
        element: <PrivateRoute>
          <HostRoute>
            <MyProfile></MyProfile>
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: 'add-post',
        element: <PrivateRoute>
          <HostRoute>
            <AddPost></AddPost>
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: 'my-post',
        element: <PrivateRoute>
          <HostRoute>
            <MyPost></MyPost>
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'manage-report',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageReport></ManageReport>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'announcement',
        element: <PrivateRoute>
          <AdminRoute>
           <Anouncement></Anouncement>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'admin-profile',
        element: <PrivateRoute>
          <AdminRoute>
           <AdminProfile></AdminProfile>
          </AdminRoute>
        </PrivateRoute>
      },
    ]
  }
]);