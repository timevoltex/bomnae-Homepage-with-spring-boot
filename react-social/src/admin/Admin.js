import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  NativeSelect,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { API_BASE_URL, ACCESS_TOKEN, DEVELOPMENT_URL } from "../constants";
function Admin() {
  const [thumbnail, setThumbnail] = useState("");
  const [fresh, isFresh] = useState(false);
  const [free, isFree] = useState(true);
  const [info, setInfo] = useState({
    title: "",
    content: "",
    file: null,
    artist: "",
    generation: "",
    format: "",
  });

  const [formatValue, setFormatValue] = useState({
    gallery: "정기전",
    subject: "",
    subvar: "",
  });
  const onSetImage = (e) => {
    setInfo({ ...info, file: e.target.files[0] });
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
      setThumbnail(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onChange = (e) => {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;

    if (inputName == "subvar" || inputName == "subject") {
      if (inputValue == "자유" && inputName == "subject") {
        isFree(true);
      } else {
        isFree(false);
      }
      setFormatValue({ ...formatValue, [inputName]: inputValue });
    } else {
      setInfo({ ...info, [inputName]: inputValue });
    }
    console.log(info);
    console.log(inputName);
    console.log(inputValue);
  };

  const onChangeFormat = (e) => {
    const target = e.target;
    const inputValue = target.value;
    if (inputValue == "신인전") {
      setFormatValue({ ...formatValue, gallery: inputValue });
      isFresh(true);
    } else {
      isFresh(false);
      isFree(true);
      setFormatValue({ gallery: inputValue, subject: "", subvar: "" });
    }
    console.log(formatValue);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (formatValue.gallery == "정기전") {
      setInfo({ ...info, format: formatValue.gallery });
    } else {
      if (formatValue.subject == "자유") {
        setInfo({
          ...info,
          format: `${formatValue.gallery}-${formatValue.subject}`,
        });
      } else {
        setInfo({
          ...info,
          format: `${formatValue.gallery}-${formatValue.subject}-${formatValue.subvar}`,
        });
      }
    }
    formData.append("title", info.title);
    formData.append("content", info.content);
    formData.append("file", info.file);
    formData.append("artist", info.artist);
    formData.append("generation", info.generation);
    formData.append("format", info.format);
    for (let a of formData.entries()) {
      console.log(a[0] + a[1]);
    }
    await axios
      .post(API_BASE_URL + "/api/v1/artwork/", formData, {
        headers: {
          Authorization: localStorage.getItem(ACCESS_TOKEN),
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response && response.message);
      })
      .catch((error) => {
        console.log(error && error.message);
      });
  };

  return (
    <div style={{ width: "50vmax", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 8,
          margin: "auto",
          border: "1px solid gray",
        }}
      >
        <Input
          required
          type="text"
          value={info.title}
          onChange={onChange}
          name="title"
          placeholder="제목을 입력해주세요"
        />
        <Input
          required
          type="text"
          value={info.content}
          onChange={onChange}
          name="content"
          placeholder="내용을 입력해주세요"
        />
        <Input
          required
          type="text"
          value={info.artist}
          onChange={onChange}
          name="artist"
          placeholder="이름을 입력해주세요"
        />
        <Input
          required
          type="text"
          value={info.generation}
          onChange={onChange}
          name="generation"
          placeholder="기수를 입력해주세요(숫자만)"
        />
        <RadioGroup
          aria-label="gallery"
          name="gallery"
          value={formatValue.gallery}
          onChange={onChangeFormat}
        >
          <FormControlLabel
            value="정기전"
            control={<Radio />}
            label="정기전"
            labelPlacement="end"
          />
          <FormControlLabel
            value="신인전"
            control={<Radio />}
            label="신인전"
            labelPlacement="end"
          />
        </RadioGroup>
        <div style={fresh ? { display: "block" } : { display: "none" }}>
          <NativeSelect
            value={formatValue.subject}
            name="subject"
            onChange={onChange}
            inputProps={{
              "aria-label": "subject",
            }}
          >
            <option value="" disabled>
              종류를 선택해주세요.
            </option>
            <option value="자유">자유전</option>
            <option value="주제">주제전</option>
          </NativeSelect>
          <div style={free ? { display: "none" } : { display: "block" }}>
            <NativeSelect
              value={formatValue.subvar}
              name="subvar"
              onChange={onChange}
              inputProps={{
                "aria-label": "subvar",
              }}
            >
              <option value="" disabled>
                주제를 정해주세요.
              </option>
              <option value="꿈">꿈</option>
              <option value="행복">행복</option>
              <option value="결핍">결핍</option>
              <option value="생명">생명</option>
              <option value="일상">일상</option>
              <option value="일탈">일탈</option>
              <option value="판타지">판타지</option>
              <option value="도시">도시</option>
              <option value="젊음">젊음</option>
              <option value="그리움">그리움</option>
              <option value="변화">변화</option>
              <option value="나">나</option>
              <option value="가족">가족</option>
            </NativeSelect>
          </div>
        </div>
        <input
          required
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={onSetImage}
          style={{ display: "none" }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="secondary" component="span">
            업로드
          </Button>
        </label>
        <button onClick={onSubmit}>제출</button>
      </div>
      <img src={thumbnail} style={{ width: "50vmax" }} />
    </div>
  );
}

export default Admin;
