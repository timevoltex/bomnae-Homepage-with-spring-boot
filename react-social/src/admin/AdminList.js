import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN, DEVELOPMENT_URL } from "../constants";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "@material-ui/core";

function AdminList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const onDelete = async (id) => {
    try {
      await axios.delete(API_BASE_URL + `/api/v1/artwork/${id}`, {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
      });

      alert();
      window.location.reload(false);
    } catch (err) {
      alert("삭제에 실패했습니다." + err.code);
    }
  };

  useEffect(() => {
    let mounted = true;
    const getArtList = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/v1/artwork/format",
          {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        setLoading(true);
        const data = response.data;
        setList(data);
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getArtList();
    console.log(list);
    console.log(loading);
    return () => (mounted = false);
  }, []);
  if (!loading) return <div>로딩중....</div>;
  else {
    return (
      <div>
        {list.map((item, i) => {
          console.log(item.id);
          return (
            <ItemContainer key={item.id}>
              <img src={item.filePath} style={{ width: "50vmin" }} />
              <p>
                <input readOnly className="title" value={item.title} />
              </p>
              <FormContainer>
                <p>
                  <button onClick={() => onDelete(item.id)}>삭제</button>
                </p>

                <Link
                  to={{ pathname: "/admin/update", state: { item: item.id } }}
                >
                  수정
                </Link>
              </FormContainer>
            </ItemContainer>
          );
        })}
      </div>
    );
  }
}

export default AdminList;

const ItemContainer = styled.div``;

const FormContainer = styled.div`
  display: flex;
  a {
    margin: auto 20px;
    appearance: button;
  }
`;
