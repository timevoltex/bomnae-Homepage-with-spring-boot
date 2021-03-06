import React, { useState } from "react";
import "./SideMenu.css";
import {
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import styled from "styled-components";

function SideMenu({ changeFormat }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [form, setForm] = useState("정기전");
  const [isFree, setIsFree] = useState(true);
  const [isFresh, setIsFresh] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onhandleSub = (format, sub) => {
    if ((format === "정기전" || format === "졸업전") && sub === null) {
      setIsFree(false);
      changeFormat(format, undefined);
      setForm(format);
      setSubject("");
    } else if (format === "신인전" && sub === "자유") {
      setIsFree(true);
      setForm("신인전");
      changeFormat(format, sub);
      setSubject(sub);
    } else {
      changeFormat(format, sub);
      setForm("신인전");
      setSubject(sub);
      setIsFree(false);
    }
  };
  const onToggleFresh = () => {
    setIsFresh(!isFresh);
  };
  return (
    <SideContainer
      component="nav"
      aria-label="regular-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="regular-list-subheader"
          disableSticky={true}
        >
          사진전
        </ListSubheader>
      }
    >
      <ListItem
        button
        selected={form === "정기전"}
        onClick={() => onhandleSub("정기전")}
      >
        <ListItemText primary="정기전" />
      </ListItem>
      <ListItem button onClick={onToggleFresh}>
        <ListItemText primary="신인전" />
        {isFresh ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isFresh} timeout="auto" unmountOnExit>
        <ListItem
          button
          selected={isFree === true}
          onClick={() => onhandleSub("신인전", "자유")}
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
              onClick={() => onhandleSub("신인전", "전체")}
            >
              <ListItemText primary="전체" />
            </ListItem>
            <ListItem
              button
              selected={subject === "가족"}
              onClick={() => onhandleSub("신인전", "가족")}
            >
              <ListItemText primary="가족" />
            </ListItem>
            <ListItem
              button
              selected={subject === "결핍"}
              onClick={() => onhandleSub("신인전", "결핍")}
            >
              <ListItemText primary="결핍" />
            </ListItem>
            <ListItem
              button
              selected={subject === "그리움"}
              onClick={() => onhandleSub("신인전", "그리움")}
            >
              <ListItemText primary="그리움" />
            </ListItem>
            <ListItem
              button
              selected={subject === "꿈"}
              onClick={() => onhandleSub("신인전", "꿈")}
            >
              <ListItemText primary="꿈" />
            </ListItem>
            <ListItem
              button
              selected={subject === "나"}
              onClick={() => onhandleSub("신인전", "나")}
            >
              <ListItemText primary="나" />
            </ListItem>
            <ListItem
              button
              selected={subject === "도시"}
              onClick={() => onhandleSub("신인전", "도시")}
            >
              <ListItemText primary="도시" />
            </ListItem>
            <ListItem
              button
              selected={subject === "변화"}
              onClick={() => onhandleSub("신인전", "변화")}
            >
              <ListItemText primary="변화" />
            </ListItem>
            <ListItem
              button
              selected={subject === "생명"}
              onClick={() => onhandleSub("신인전", "생명")}
            >
              <ListItemText primary="생명" />
            </ListItem>
            <ListItem
              button
              selected={subject === "일상"}
              onClick={() => onhandleSub("신인전", "일상")}
            >
              <ListItemText primary="일상" />
            </ListItem>
            <ListItem
              button
              selected={subject === "일탈"}
              onClick={() => onhandleSub("신인전", "일탈")}
            >
              <ListItemText primary="일탈" />
            </ListItem>
            <ListItem
              button
              selected={subject === "젊음"}
              onClick={() => onhandleSub("신인전", "젊음")}
            >
              <ListItemText primary="젊음" />
            </ListItem>
            <ListItem
              button
              selected={subject === "판타지"}
              onClick={() => onhandleSub("신인전", "판타지")}
            >
              <ListItemText primary="판타지" />
            </ListItem>
            <ListItem
              button
              selected={subject === "행복"}
              onClick={() => onhandleSub("신인전", "행복")}
            >
              <ListItemText primary="행복" />
            </ListItem>
          </List>
        </Collapse>
      </Collapse>

      <ListItem
        button
        selected={form === "졸업전"}
        onClick={() => onhandleSub("졸업전")}
      >
        <ListItemText primary="졸업전" />
      </ListItem>
    </SideContainer>
  );
}

export default SideMenu;

const SideContainer = styled(List)`
  @media only screen and (max-width: 460px) {
    .MuiListItem-gutters,
    .MuiListSubheader-gutters {
      padding-left: 8px;
      padding-right: 8px;
    }
    .MuiListSubheader-root {
      font-size: 0.5em;
    }
    .MuiTypography-body1,
    .MuiListItemText-root {
      font-size: 0.8rem;
    }
    .MuiSvgIcon-root {
      width: 0.5em;
      height: 0.5em;
    }
  }
`;
