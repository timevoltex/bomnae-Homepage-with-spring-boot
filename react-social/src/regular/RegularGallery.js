import React, { useState, useEffect } from "react";
import GalleryContent from "../common/GalleryContent";
import { Grid } from "@material-ui/core";
import SideMenu from "../common/SideMenu";
import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
import Scaleup from "../common/Sacleup";

function RegularGallery() {
  const [item, setItem] = useState([]);
  const [generate, setGenerate] = useState(null);
  const [isScale, setIsScale] = useState(false);
  const getImage = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "/api/v1/artwork/format/정기전",
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
  const getGenItem = async (gen) => {
    if (gen !== null) {
      setGenerate(gen);
      try {
        const response = await axios.get(
          API_BASE_URL + `/api/v1/artwork/gen/${generate}`,
          {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        const data = response.data;
        setItem(data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onScaleUp = () => {
    setIsScale(!isScale);
  };

  useEffect(() => {
    getImage();
  }, []);
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideMenu isRegular={true} onGetItem={getGenItem} />
      </Grid>
      <Grid item xd={12} sm container>
        <GalleryContent data={item} onClick={onScaleUp} />
      </Grid>
      <Scaleup isScale={isScale} onScaleUp={onScaleUp} data={item} />
    </Grid>
  );
}

export default RegularGallery;
