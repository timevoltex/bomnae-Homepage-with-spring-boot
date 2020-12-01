import React, { useState } from "react";
import GalleryContent from "../common/GalleryContent";
import { Grid } from "@material-ui/core";
import SideMenu from "../common/SideMenu";

function Gallery() {
  const [category, setCategory] = useState({
    format: "정기전",
    subject: undefined,
  });
  const [isDone, setIsDone] = useState(false);
  const changeFormat = (format, subject) => {
    setIsDone(false);
    setCategory({ format: format, subject: subject });
  };
  // const getGenItem = async (gen) => {
  //   if (gen !== null) {
  //     setGenerate(gen);
  //     try {
  //       const response = await axios.get(
  //         API_BASE_URL + `/api/v1/artwork/gen/${generate}`,
  //         {
  //           headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
  //         }
  //       );
  //       const data = response.data;
  //       setItem(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
  // const onScaleUp = (current) => {
  //   setIsScale(!isScale);
  //   if (current !== undefined || current !== null) {
  //     setCurrentItem(current);
  //   }
  // };

  return (
    <Grid container>
      <Grid item xs={2}>
        <SideMenu changeFormat={changeFormat} />
      </Grid>
      <Grid item xd={12} sm container>
        <GalleryContent category={category} isDone={isDone} />
      </Grid>
    </Grid>
  );
}

export default Gallery;
