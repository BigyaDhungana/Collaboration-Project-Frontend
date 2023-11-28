import React from "react";
import { Spinner ,Heading} from "@gluestack-ui/themed";
const Loading = ({size,text}) => {
  return (
    <div style={{ position: "absolute", top: "40%", left: "50%" }}>
      <Heading>{text}</Heading>
      <Spinner size={size}/>
    </div>
  );
};

export default Loading;
