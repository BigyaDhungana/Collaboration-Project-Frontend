"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button, ButtonIcon, GluestackUIProvider } from "@gluestack-ui/themed";
import "../../../css/features.css";
import { TiTick } from "react-icons/ti";
import { useLocalData } from "../../../../../hooks/useLocalData";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../../../utils/toasT";
import { deleteMediaApi } from "../../../../../apiFunc/media";
const url = `${process.env.NEXT_PUBLIC_API_URL}/`;

const Mediadiv = ({ imgObj, func, query, ivp }) => {
  const { authToken, isMounted } = useLocalData();

  const [copyPressed, setCopyPressed] = useState(false);
  const deleteMediaResponse = useMutation({
    mutationFn: () => {
      deleteMediaApi(authToken, { media: Number(imgObj.id) });
    },
    onSuccess: () => {
      func(!ivp);
      showToast("Image deleted successfully", "success");
      query.refetch();
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const handleCopy = () => {
    setCopyPressed(true);
    navigator.clipboard.writeText(`${url}${imgObj.image_slug}`);
    showToast("Link copied to clipboard", "info");
    setTimeout(() => {
      setCopyPressed(false);
    }, 1000);
  };

  const handleDelete = () => {
    const userResponse = prompt(
      "Are you sure you want to delete this image?",
      "YES"
    );
    if (userResponse === "YES") {
      deleteMediaResponse.mutate();
    }
  };

  return (
    <>
      <div className="mediaContainer">
        <div className="mediaImageC">
          <a
            href={`${url}${imgObj.image_slug}`}
            target="blank"
            className="imageLink"
          >
            <Image
              src={`${url}${imgObj.thumbnail_slug}`}
              alt={imgObj.name}
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
