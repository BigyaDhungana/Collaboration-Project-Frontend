import Profile from "./profile";
import Image from "next/image";
import logo from "/public/tasksphere.png";
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
        <div style={{marginLeft:"3px"}}>
          <Image src={logo} alt="pc" width={180}/>
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Headerbar;
