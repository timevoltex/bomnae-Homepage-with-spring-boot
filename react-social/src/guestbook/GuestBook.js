import React, { useState, Fragment, useEffect, useRef } from "react";
import { TextField, Divider, IconButton } from "@material-ui/core";
import { Directions, Person } from "@material-ui/icons";
import axios from "axios";
import { GUESTBOOK_URL, ACCESS_TOKEN, API_BASE_URL } from "../constants";
import LoadingIndicator from "../common/LoadingIndicator";
import styled from "styled-components";

function GuestBook({ auth }) {
  // const [comment, setComment] = useState([{time:"2020.09.28",content:[{id:'text', comment:"메롱"}, {id:'tes1t', comment:'라리룰라'}] }, {time:"2020.09.30", content:[{id:'test', comment:'ㅇㄹㅇㄹㅇ'}]}, {time:"2020.10.01", content:[{id:'test', comment:'ㄴㄹㅇㄹㄴㅇ'}]}])
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      addComment();
    }
  };

  const valueRef = useRef();

  const addComment = async () => {
    if (auth) {
      setLoading(true);
      await axios
        .post(
          `${API_BASE_URL}/guestbook`,
          { comment: valueRef.current.value },
          {
            headers: { Authorization: `${localStorage.getItem(ACCESS_TOKEN)}` },
          }
        )
        .then((response) => {
          console.log(response.code);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      alert("로그인 후 이용할 수 있습니다");
    }
  };
  useEffect(() => {
    const info = async () => {
      return await axios
        .get(GUESTBOOK_URL, {
          headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
        })
        .then((response) => {
          return response.data;
        });
    };
    info().then((response) => {
      setComment(response);
      setLoading(false);
    });
  }, [loading]);
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <Fragment>
        <Root>
          <Input
            fullWidth
            inputRef={valueRef}
            type="text"
            onKeyPress={pressEnter}
            placeholder="방명록을 작성해주세요"
          />
          <CustomDivider />
          <IconButton color="primary" onClick={addComment}>
            <Directions />
          </IconButton>
        </Root>
        <div style={{ width: "100%", margin: "3px auto" }}>
          {comment.map((data, i) => (
            <Root key={data.modifiedDate + i}>
              {data.user.imageUrl !== null ? (
                <ProfileImage src={data.user.imageUrl} alt="userProfile" />
              ) : (
                <InitProfile />
              )}
              {data.user.name}
              <CustomDivider />
              {data.guestbook}
            </Root>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default GuestBook;

const ProfileImage = styled.img`
  width: 10%;
  height: 30%;
  margin-right: 4%;
`;

const InitProfile = styled(Person)`
  width: 10%;
  height: 30%;
  margin-right: 4%;
`;

const Root = styled.div`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 95%;
  border: 1px solid black;
  margin: 0 auto;
`;

const CustomDivider = styled(Divider)`
  height: 100%;
  margin: 4px !important;
`;

const Input = styled(TextField)`
  margin-left: 10;
  flex: 1;
  padding-left: 8px;
`;
