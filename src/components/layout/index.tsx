import React from "react";
import { useEffect } from "react";
import { userInfoAsync } from "@/store/modules/user.module";
import { useStore } from "@/store";

const Layout = () => {

  const dispatch = useStore()

  useEffect(() => {
    const a = dispatch(userInfoAsync())
    console.log('a=======>', a)
  }, [])
  return <div>
    Layout
  </div>
}

export default Layout;
