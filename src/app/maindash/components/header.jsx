import Profile from "./profile";
import Image from "next/image";
import logo from "/public/logo.svg";
const Headerbar = (props) => {

  
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginRight:15
        }}
      >
        <div>
          <Image src={logo} alt="pc" />
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Headerbar;
