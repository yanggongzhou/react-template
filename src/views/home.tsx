import React, { useEffect } from "react";
import ComLayout from "@/components/layout";
import { initAxios } from "@/utils/axios";
import { useStore } from "react-redux";
import { RootState } from "@/store";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const store = useStore<RootState>()
  const navigate = useNavigate();

  useEffect(() => {
    initAxios(store, navigate)
  },[])

  return <div>
    <ComLayout/>
    Home
    <Link to="/" style={{ padding: 5 }}>
      Home
    </Link>
    <Link to="/login" style={{ padding: 5 }}>
      login
    </Link>

  </div>;
};

export default Home;
