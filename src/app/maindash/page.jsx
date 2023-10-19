"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

 
  useEffect(() => {
    setIsMounted(true);
  }, []);

 if (!isMounted) {
    return;
  }

  return (
    <>
      <Navbar />
    </>
  );
};

export default Dashboard;
