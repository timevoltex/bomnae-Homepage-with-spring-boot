import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import {
  FormControlLabel,
  TextField,
  Button,
  NativeSelect,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import LoadingIndicator from "../common/LoadingIndicator";

function AdminUpdate({ ...props }) {
  const [update, setUpdate] = useState({});
  const [meta, setMeta] = useState({});
  const [fresh, isFresh] = useState(false);
  const [free, isFree] = useState(true);

  const [formatValue, setFormatValue] = useState({
    gallery: "정기전",
    subject: "",
    subvar: "",
  });
  const [thumbnail, setThumbnaii] = useState("");
  const [loading, setLoading] = useState({
    loading: true,
    setting: true,
  });

  const onChange = (e) => {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;

    if (inputName === "subvar" || inputName === "subject") {
      if (inputValue === "자유" && inputName === "subject") {
        isFree(true);
      } else {
        isFree(false);
      }
      setFormatValue({ ...formatValue, [inputName]: inputValue });
    } else {
      setUpdate({ ...update, [inputName]: inputValue });
    }
  };

  const onChangeFormat = (e) => {
    const target = e.target;
    const inputValue = target.value;
    if (inputValue === "신인전") {
      setFormatValue({ ...formatValue, gallery: inputValue });
      isFresh(true);
    } else {
      isFresh(false);
      isFree(true);
      setFormatValue({ gallery: inputValue, subject: "", subvar: "" });
    }
  };

  const setFormat = () => {
    if (formatValue.gallery === "정기전") {
      console.log(formatValue);
      setUpdate({ ...update, format: "정기전" });
    } else {
      if (formatValue.subject === "자유") {
        setUpdate({
          ...update,
          format: `${formatValue.gallery}-${formatValue.subject}`,
        });
      } else {
        setUpdate({
          ...update,
          format: `${formatValue.gallery}-${formatValue.subject}-${formatValue.subvar}`,
        });
      }
    }
  };

  const onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setMeta({ ...meta, [name]: value });
  };
  const onSubmit = async () => {
    setFormat();
    setUpdate({ ...update, exif: meta });
    setLoading({ ...loading, setting: false });
    if (!loading.setting) {
      await axios
        .post(
          API_BASE_URL + `/api/v1/artwork/${props.location.state.item}`,
          update,
          {
            headers: {
              Authorization: localStorage.getItem(ACCESS_TOKEN),
              "Content-type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response && response.message);
          props.history.push("/admin/list");
        })
        .catch((error) => {
          console.log(error && error.message);
        });
    }
  };

  const test = async () => {
    if (loading.loading) {
      try {
        const response = await axios.get(
          API_BASE_URL + `/api/v1/artwork/${props.location.state.item}`,
          {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        const data = response.data;
        setThumbnaii(data.filepath);

        delete data.filepath;
        delete data.id;
        data.exif.hibernateLazyInitializer = undefined;
        delete data.exif.hibernateLazyInitializer;

        setMeta(data.exif);
        console.log(data);
        setLoading({ ...loading, loading: false });
      } catch (err) {
        console.log(err.message);
        setLoading({ ...loading, loading: false });
      }
    }
  };

  useEffect(() => {
    test();
  }, []);
  if (loading.loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <div>
        <img
          src={thumbnail || ""}
          style={{ width: "50vmin" }}
          alt="thumbnail"
        />
        {/* <form onSubmit={onSubmit}> */}
        <p>
          이름:
          <input
            type="text"
            value={update.artist || ""}
            className="artist"
            name="artist"
            onChange={onChange}
          />
        </p>
        <p>
          작품명:
          <input
            type="text"
            value={update.title || ""}
            className="title"
            name="title"
            onChange={onChange}
          />
        </p>
        <p>
          작품 설명:
          <input
            type="text"
            value={update.content || ""}
            className="content"
            name="content"
            onChange={onChange}
          />
        </p>
        <p>
          기수:
          <input
            type="number"
            value={update.generation || ""}
            className="generation"
            name="generation"
            onChange={onChange}
          />
        </p>
        <p>
          전시 종류:
          <div>
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
          </div>
        </p>
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
            startIcon={<CloudUpload />}
            onClick={onSubmit}
          >
            수정 완료
          </Button>
        </div>
        <button onClick={onSubmit}>완료</button>
        {/* </form> */}
      </div>
    );
  }
}

export default AdminUpdate;
