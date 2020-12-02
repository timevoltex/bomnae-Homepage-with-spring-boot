import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  }, []);
  if (!loading) return <div>로딩중....</div>;
  else {
    return (
      <div>
        {list.map((item, i) => {
          console.log(item.id);
          return (
            <ItemContainer key={item.id}>
              <img
                src={item.filePath}
                style={{ width: "50vmin" }}
                alt="thumbnail"
              />
              <div style={{ height: "inherit", margin: "auto 10em" }}>
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
                    전시정보 수정
                  </Link>
                  <Link
                    to={{ pathname: "/admin/meta", state: { item: item.id } }}
                  >
                    메타데이터 수정
                  </Link>
                </FormContainer>
              </div>
            </ItemContainer>
          );
        })}
      </div>
    );
  }
}

export default AdminList;

const ItemContainer = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  display: flex;
  a {
    margin: auto 20px;
    appearance: button;
  }
`;
