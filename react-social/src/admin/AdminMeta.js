import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

function AdminMeta({ ...props }) {
  const [meta, setMeta] = useState({});
  const id = props.location.state.item;

  const getMeta = async () => {
    try {
      const response = await axios.get(API_BASE_URL + `/api/v1/artwork/${id}`, {
        headers: { Autorization: localStorage.getItem(ACCESS_TOKEN) },
      });
      const data = response.data;
      setMeta(data.exif);
      console.log(data.exif);
    } catch (err) {
      console.log(err);
    }
  };
  const onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setMeta({ ...meta, [name]: [value] });
  };

  const onSubmit = async () => {
    try {
      const response = await axios.put(
        API_BASE_URL + `/api/v1/artwork/${id}`,
        meta,
        {
          headers: {
            Autorization: localStorage.getItem(ACCESS_TOKEN),
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.status;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMeta();
  }, []);
  return (
    <div style={{ maxWidth: "60vw", margin: "10em auto" }}>
      <TextField
        value={meta.aperture || ""}
        fullWidth
        label="조리개"
        onChange={onHandleChange}
        name="aperture"
      />
      <TextField
        value={meta.exposureTime || ""}
        fullWidth
        label="셔터속도"
        onChange={onHandleChange}
        name="exposureTime"
      />
      <TextField
        value={meta.focusLength || ""}
        fullWidth
        label="초점거리"
        onChange={onHandleChange}
        name="focusLength"
      />
      <TextField
        value={meta.iso || ""}
        fullWidth
        label="ISO"
        onChange={onHandleChange}
        name="iso"
      />
      <TextField
        value={meta.maker || ""}
        fullWidth
        label="제조사"
        onChange={onHandleChange}
        name="maker"
      />
      <TextField
        value={meta.model || ""}
        fullWidth
        label="모델"
        onChange={onHandleChange}
        name="model"
      />
      <Button
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        onClick={onSubmit}
      >
        수정 완료
      </Button>
    </div>
  );
}

export default AdminMeta;
