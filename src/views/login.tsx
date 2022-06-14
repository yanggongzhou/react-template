import React, { useEffect } from "react";
import { Button, notification } from "antd";
import { login } from "@/service/user";
import { useStore } from "react-redux";
import { setUserInfo } from "@/store/modules/user.module";
import { Link } from "react-router-dom";

const Login = () => {

  const store = useStore()

  const loginBtn = async () => {
    const data = await login({
      userName: 'yanggz@dianzhong.com',
      password: 'Mygz123456'
    })
    store.dispatch(setUserInfo(data))
    console.log('store', store, store.getState())

  }

  useEffect(() => {
    notification.error({ message: 'network error', placement: 'topRight' });
  }, [])

  return <div>
    Login
    <Button type={'primary'} onClick={() => loginBtn()}>sign in</Button>
    <Link to={'/'}>home</Link>
  </div>;
};

export default Login;
