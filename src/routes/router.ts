// router.ts
import { lazy } from "react";

const Home = lazy(() => import("@/views/home"));
const Login = lazy(() => import("@/views/login"));

export default [
  { path: "/", key: 1, name: "首页", component: Home },
  { path: "/home", key: 2, name: "首页", component: Home },
  { path: "/login", key: 2, name: "登录", component: Login },
];
