import React, { useState, useEffect } from "react";
import GalleryContent from "../common/GalleryContent";
import { Grid } from "@material-ui/core";
import SideMenu from "../common/SideMenu";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import Scaleup from "../common/Sacleup";
import getItem from "../common/getItem";

function FreshGallery() {
  const [item, setItem] = useState([]);
  const [sub, setSub] = useState("전체");
  const [isScale, setIsScale] = useState(false);
  const onScaleUp = () => {
    setIsScale(!isScale);
  };

  const getFreeItem = async () => {
    try {
      getItem("신인전-자유").then((response) => {
        const data = response;
        setItem(data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getSubjectItem = async (subject) => {
    try {
      if (subject === null || subject === "전체") {
        setSub("전체");
        getItem("신인전-주제").then((response) => {
          const data = response;
          setItem(data);
        });
      } else {
        setSub(subject);
        getItem("신인전-주제", subject).then((response) => {
          const data = response;
          setItem(data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFreeItem();
  }, []);
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideMenu onGetItem={{ getSubjectItem, getFreeItem }} />
      </Grid>
      <Grid item xd={12} sm container>
        <GalleryContent data={item} onClick={onScaleUp} />
      </Grid>
      <Scaleup data={item} isScale={isScale} onScaleUp={onScaleUp} />
    </Grid>
  );
}

export default FreshGallery;
