"use client"
import {useState,useEffect} from 'react'
import VNavbar from '../../components/vNavbar'
import Headerbar from '../../../maindash/components/header';

const Addtask = () => {
  //prevent ssr
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;

  return (
    <>
      <Headerbar></Headerbar>
      <VNavbar></VNavbar>
    </>
  );
}

export default Addtask