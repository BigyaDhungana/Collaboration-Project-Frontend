"use client";
import Login from "./login/page";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loginpage from "./login/components/LoginPage";

export default function Home() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

  //   return (
  //      <Login/>
  //   );
  // }
  // const router = useRouter();
  // router.push("/login");
  return <Loginpage/>;
}
