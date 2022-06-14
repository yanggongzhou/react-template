import React from "react";
import { Button } from "antd";
import { login } from "@/service/user";

const Login = () => {

  const loginBtn = async () => {
    await login({
      userName: 'yanggz@dianzhong.com',
      password: 'Mygz123456'
    })
  }

  return <div>
    Login
    <Button type={'primary'} onClick={() => loginBtn()}>sign in</Button>
  </div>;
};

export default Login;
