"use client";

import { useState, useEffect } from "react";
import Loginpage from "./components/LoginPage"

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
      <Loginpage/>
  );
}
