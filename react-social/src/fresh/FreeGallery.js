import React, { useState, useEffect } from "react";
import GalleryContent from "../common/GalleryContent";
import { Grid } from "@material-ui/core";
import SideMenu from "../common/SideMenu";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

function FreshGallery() {
  const [item, setItem] = useState([]);
  const [sub, setSub] = useState("전체");
  const getItem = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "/api/v1/artwork/format/신인전-자유",
        {
          headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
        }
      );
      const data = response.data;
      setItem(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getSubjectItem = async (subject) => {
    try {
      if (subject === null || subject === "전체") {
        setSub("전체");
        const response = await axios.get(
          API_BASE_URL + `/api/v1/artwork/format/신인전-주제`,
          {
            headers: { Autorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        const data = response.data;
        setItem(data);
      } else {
        setSub(subject);
        const response = await axios.get(
          API_BASE_URL + `/api/v1/artwork/format/신인전-주제-${subject}`,
          {
            headers: { Autorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        const data = response.data;
        setItem(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getItem();
  }, []);
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideMenu onGetItem={{ getSubjectItem, getItem }} />
      </Grid>
      <Grid item xd={12} sm container>
        <GalleryContent data={item} />
      </Grid>
    </Grid>
  );
}

export default FreshGallery;
