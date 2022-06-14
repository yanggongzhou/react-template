import React from "react";
import { useEffect } from "react";
import { userInfoAsync } from "@/store/modules/user.module";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

const Layout = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const a = dispatch(userInfoAsync())
  }, [])
  return <div>
    Layout
  </div>
}

export default Layout;
