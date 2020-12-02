import React, { useState } from "react";
import GalleryContent from "../common/GalleryContent";
import { Grid } from "@material-ui/core";

import SideMenu from "./SideMenu";
import CustomDrawer from "./CustomDrawer";

function Gallery() {
  const [category, setCategory] = useState({
    format: "정기전",
    subject: undefined,
  });
  const [isDone, setIsDone] = useState(false);
  const done = (request) => {
    setIsDone(request);
  };
  const changeFormat = (format, subject) => {
    setIsDone(false);
    setCategory({ format: format, subject: subject });
  };
  const mobile = window.innerWidth;
  return (
    <Grid container>
      <Grid item xs={mobile > 450 ? 2 : false}>
        {mobile > 450 ? (
          <SideMenu changeFormat={changeFormat} />
        ) : (
          <CustomDrawer>
            <SideMenu changeFormat={changeFormat} />
          </CustomDrawer>
        )}
      </Grid>
      <Grid item xs={mobile > 450 ? 10 : 12} sm container>
        <GalleryContent category={category} isDone={isDone} setDone={done} />
      </Grid>
    </Grid>
  );
}

export default Gallery;
