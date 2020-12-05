import React, { useState, Fragment } from "react";
import GalleryContent from "../common/GalleryContent";
import { Grid } from "@material-ui/core";

import SideMenu from "./SideMenu";
import CustomDrawer from "./CustomDrawer";

import styled from "styled-components";

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
          <Fragment>
            <SideMenu changeFormat={changeFormat} />

            <Copyright>
              <h3>Copyright 2020 봄내사진예술연구회 all rights reserved.</h3>
              <h3>
                본 온라인 사진전 내의 모든 사진은 저작권법에 따라 보호받습니다.
              </h3>
            </Copyright>
          </Fragment>
        ) : (
          <CustomDrawer>
            <SideMenu changeFormat={changeFormat} />

            <Copyright>
              <h5>Copyright 2020 봄내사진예술연구회 all rights reserved.</h5>
              <h5>
                본 온라인 사진전 내의 모든 사진은 저작권법에 따라 보호받습니다.
              </h5>
            </Copyright>
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

const Copyright = styled.div`
  position: relative;
  width: 240px;
  bottom: 0;
  margin-left: 1vmin;
`;
