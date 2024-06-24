import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/index";
// import Main from "../pages/main";
import Home from "../pages/home/Home";
import Mail from "../pages/mail/Mail";
import User from "../pages/user/User";
import UserSettings from "../pages/userSettings/UserSettings";
import Login from "../pages/login/Login";

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        title: "首页",
        Component: Home,
      },
      {
        path: "mail",
        title: "邮件",
        Component: Mail,
      },
      {
        path: "user",
        title: "用户管理",
        Component: User,
      },
      {
        path: "UserSettings",
        title: "个人设置",
        Component: UserSettings,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
];

export default createBrowserRouter(routes);
