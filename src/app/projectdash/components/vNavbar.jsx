import React, { useEffect, useState } from "react";
import "../css/index.css";
//dummy
import { dummyinfo } from "../../testdata/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VNavbar = () => {
  const currentPath = usePathname();
  const [active, setActive] = useState({
    tasks: "active",
    documentation: "",
    addtask: "",
  });
  useEffect(() => {
    if (currentPath.includes("documentation")) {
      setActive({ tasks: "", documentation: "active", addtask: "" });
    }
    if (currentPath.includes("addtask")) {
      setActive({ tasks: "", documentation: "", addtask: "active" });
    }
  }, []);

  return (
    <div
      style={{
        borderWidth: "1px",
        borderColor: "black",
        borderStyle: "solid",
        display: "block",
        width: "200px",
        marginTop: "10px",
        height: "450px",
      }}
    >
      <div>
        <Link href={"/maindash"} className="link">
          Dashboard
        </Link>

        <Link href={"/projectdash"} className={`link ${active.tasks}`}>
          Tasks
        </Link>

        <Link
          href={"/projectdash/documentation"}
          className={`link ${active.documentation}`}
        >
          Documentation
        </Link>

        <Link
          href={"/projectdash/addtask"}
          className={`link ${active.addtask}`}
        >
          Add Tasks
        </Link>
      </div>
    </div>
  );
};

export default VNavbar;
