"use client";

import { useState, useEffect } from "react";
import Loginpage from "./components/LoginPage";

export default function Login() {

  //prevent ssr hydration error
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Loginpage />;
}
