import React, { useState } from "react";
import "./SideMenu.css";
import { Link } from "react-router-dom";
import {
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function SideMenu({ isRegular, name, onGetItem }) {
  const [open, setOpen] = useState(false);
  const [gen, setGen] = useState(0);
  const [subject, setSubject] = useState("");
  const [isFree, setIsFree] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const onhandleGen = (gen) => {
    setGen(gen);
    onGetItem(gen);
  };
  const onhandleSub = (sub) => {
    setSubject(sub);
    setIsFree(false);
    onGetItem.getSubjectItem(sub);
  };
  const onToogleFree = () => {
    setIsFree(true);
    onGetItem.getItem();
  };
  if (isRegular) {
    return (
      <List
        component="nav"
        aria-label="regular-list-subheader"
        subheader={
          <ListSubheader component="div" id="regular-list-subheader">
            정기전
          </ListSubheader>
        }
      >
        <ListItem button selected={gen === 46} onClick={() => onhandleGen(46)}>
          <ListItemText primary="46기" />
        </ListItem>
        <ListItem button selected={gen === 47} onClick={() => onhandleGen(47)}>
          <ListItemText primary="47기" />
        </ListItem>
        <ListItem button selected={gen === 48} onClick={() => onhandleGen(48)}>
          <ListItemText primary="48기" />
        </ListItem>
        <ListItem button selected={gen === 49} onClick={() => onhandleGen(49)}>
          <ListItemText primary="49기" />
        </ListItem>
      </List>
    );
  } else if (isRegular === undefined && name !== undefined) {
    return (
      <List
        component="nav"
        aria-label="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-sub-header">
            졸업전
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemText primary="41기 권순후" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="45기 박재현" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="45기 조봉준" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="47기 정지훈" />
        </ListItem>
      </List>
    );
  } else {
    return (
      <List
        component="nav"
        aria-label="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-sub-header">
            신인전
          </ListSubheader>
        }
      >
        <ListItem
          button
          selected={isFree === true}
          onClick={() => onToogleFree()}
        >
          <ListItemText primary="자유전" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="주제전" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              selected={subject === "전체"}
              onClick={() => onhandleSub("전체")}
            >
              <ListItemText primary="전체" />
            </ListItem>
            <ListItem
              button
              selected={subject === "가족"}
              onClick={() => onhandleSub("가족")}
            >
              <ListItemText primary="가족" />
            </ListItem>
            <ListItem
              button
              selected={subject === "결핍"}
              onClick={() => onhandleSub("결핍")}
            >
              <ListItemText primary="결핍" />
            </ListItem>
            <ListItem
              button
              selected={subject === "그리움"}
              onClick={() => onhandleSub("그리움")}
            >
              <ListItemText primary="그리움" />
            </ListItem>
            <ListItem
              button
              selected={subject === "꿈"}
              onClick={() => onhandleSub("꿈")}
            >
              <ListItemText primary="꿈" />
            </ListItem>
            <ListItem
              button
              selected={subject === "나"}
              onClick={() => onhandleSub("나")}
            >
              <ListItemText primary="나" />
            </ListItem>
            <ListItem
              button
              selected={subject === "도시"}
              onClick={() => onhandleSub("도시")}
            >
              <ListItemText primary="도시" />
            </ListItem>
            <ListItem
              button
              selected={subject === "변화"}
              onClick={() => onhandleSub("변화")}
            >
              <ListItemText primary="변화" />
            </ListItem>
            <ListItem
              button
              selected={subject === "생명"}
              onClick={() => onhandleSub("생명")}
            >
              <ListItemText primary="생명" />
            </ListItem>
            <ListItem
              button
              selected={subject === "일상"}
              onClick={() => onhandleSub("일상")}
            >
              <ListItemText primary="일상" />
            </ListItem>
            <ListItem
              button
              selected={subject === "일탈"}
              onClick={() => onhandleSub("일탈")}
            >
              <ListItemText primary="일탈" />
            </ListItem>
            <ListItem
              button
              selected={subject === "젊음"}
              onClick={() => onhandleSub("젊음")}
            >
              <ListItemText primary="젊음" />
            </ListItem>
            <ListItem
              button
              selected={subject === "판타지"}
              onClick={() => onhandleSub("판타지")}
            >
              <ListItemText primary="판타지" />
            </ListItem>
            <ListItem
              button
              selected={subject === "행복"}
              onClick={() => onhandleSub("행복")}
            >
              <ListItemText primary="행복" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

export default SideMenu;
