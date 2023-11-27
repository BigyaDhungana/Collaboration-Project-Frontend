import React, { useEffect, useState } from "react";
import "../css/index.css";
//dummy
import { dummyinfo } from "../../testdata/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { queryParamGenerator } from "../../../utils/querypara";
import { useLocalData } from "../../../hooks/useLocalData";

const VNavbar = () => {
  const currentPath = usePathname();
  const [active, setActive] = useState({
    tasks: "active",
    documentation: "",
    addtask: "",
    media: "",
  });

  const { metaData, isMounted } = useLocalData();

  useEffect(() => {
    if (currentPath.includes("documentation")) {
      setActive({ tasks: "", documentation: "active", addtask: "", media: "" });
    }
    if (currentPath.includes("addtask")) {
      setActive({ tasks: "", documentation: "", addtask: "active", media: "" });
    }
    if (currentPath.includes("media")) {
      setActive({ tasks: "", documentation: "", addtask: "", media: "active" });
    }
  }, []);

  if (!isMounted) return null;

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

        <Link
          href={`/projectdash?${queryParamGenerator("pid", metaData[0].project_id)}`}
          className={`link ${active.tasks}`}
        >
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
        <Link href={"/projectdash/media"} className={`link ${active.media}`}>
          Media
        </Link>
      </div>
    </div>
  );
};

export default VNavbar;
