"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button, ButtonIcon, GluestackUIProvider } from "@gluestack-ui/themed";
import "../../../css/features.css";
import { TiTick } from "react-icons/ti";

//
import image from "../../../../../../public/download.jpeg";
import { icons } from "react-icons";

const Mediadiv = ({ url, alt }) => {
  const [copyPressed, setCopyPressed] = useState(false);

  const handleCopy = () => {
    setCopyPressed(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopyPressed(false);
    }, 1000);
  };

  const handleDelete = () => {
    console.log("api call");
  };

  return (
    <>
      <div className="mediaContainer">
        <div className="mediaImageC">
          <Image
            src={image}
            alt="ds"
            width={200}
            height={200}
            className="mediaImage"
          ></Image>
        </div>
        <div className="mediaButtonsdiv">
          <Button onPress={handleCopy} size="sm">
            <ButtonIcon>
              {copyPressed ? <TiTick /> : <MdOutlineContentCopy />}
              {/* <MdOutlineContentCopy /> */}
            </ButtonIcon>
          </Button>
          <Button onPress={handleDelete} size="sm">
            <ButtonIcon>
              <RiDeleteBinLine />
            </ButtonIcon>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Mediadiv;
