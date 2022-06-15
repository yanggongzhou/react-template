import React from "react";
import ComLayout from "@/components/layout";
import { Link } from "react-router-dom";

const Home = () => {
  return <div>
    <ComLayout/>
    This is Home Page!!
    <br/>
    Jump to:
    <Link to="/login" style={{ padding: 5 }}>
      login
    </Link>
  </div>;
};

export default Home;
