"use client";
import Login from "./login/page";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loginpage from "./login/components/LoginPage";
import { useUserContext } from "../context/userContext";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { authKey, useAuthkey } = useUserContext();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Loginpage />;
}
