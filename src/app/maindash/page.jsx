"use client";

import React, { useEffect, useState } from "react";
import Headerbar from "./components/header";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

 
  useEffect(() => {
    setIsMounted(true);
  }, []);

 if (!isMounted) {
    return;
  }

  return (
      <Headerbar />
  );
};

export default Dashboard;
