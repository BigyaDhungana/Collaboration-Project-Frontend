"use client";
import Login from "./login/page";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     setIsMounted(true);
  //   }, []);

  //   if (!isMounted) return null;

  //   return (
  //      <Login/>
  //   );
  // }
  return (
    <h2>
      login at <Link href="/login">/login</Link>
    </h2>
  );
}
