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
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../../../utils/toasT";

const Mediadiv = ({ url, alt, id }) => {
  const [copyPressed, setCopyPressed] = useState(false);

  const deletemediaResponse = useMutation({
    mutationFn: () => {
      deleteMediaApi(authToken, { media: id });
    },
    onSuccess: () => {
      showToast("Image deleted successfully", "success");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const handleCopy = () => {
    setCopyPressed(true);
    navigator.clipboard.writeText("huthuth");
    setTimeout(() => {
      setCopyPressed(false);
    }, 1000);
  };

  const handleDelete = () => {
    // deletemediaResponse.mutate();
    console.log(id);
  };

  return (
    <>
      <div className="mediaContainer">
        <div className="mediaImageC">
          <a href="https://gluestack.io/ui/docs/components/forms/button" target="blank" className="imageLink">
            <Image
              src={image}
              alt="ds"
              width={200}
              height={200}
              className="mediaImage"
            ></Image>
          </a>
        </div> 
        <div className="mediaButtonsdiv">
          <Button onPress={handleCopy} size="sm">
            <ButtonIcon>
              {copyPressed ? <TiTick /> : <MdOutlineContentCopy />}
              {/* <MdOutlineContentCopy /> */}
            </ButtonIcon>
          </Button>
          <Button onPress={handleDelete} size="sm" action="negative">
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
