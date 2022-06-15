/* eslint-disable */
import React from "react";
import { useEffect } from "react";
import { userInfoAsync } from "@/store/modules/user.module";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const Layout = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userInfoAsync());
  }, []);
  return <div>
    Layout
  </div>;
};

export default Layout;
