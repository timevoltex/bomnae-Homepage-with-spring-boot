import React, { useRef, Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { getItem } from "./getItem";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import LoadingIndicator from "./LoadingIndicator";

function GalleryContent({ category, isDone, setDone }) {
  const scaleUp = useRef(document.createElement("div"));
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [navIndex, setNavIndex] = useState(0);
  let scaleSlider = [];
  let listSlider = [];
  const meta = [];
  const [detail, setDetail] = useState([]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true,
    nextArrow: <KeyboardArrowRight />,
    prevArrow: <KeyboardArrowLeft />,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          arrows: false,
        },
      },
    ],
    beforeChange: (_, next) => {
      setNavIndex(next);
    },
  };

  const listSettings = {
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 500,
    infinite: false,
    dots: false,
    centerPadding: "60px",
    centerMode: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
    beforeChange: (_, next) => {
      setNavIndex(next);
    },
  };
  function goTo(index) {
    setNavIndex(index);
    scaleSlider.slickGoTo(navIndex);
    listSlider.slickGoTo(navIndex);
  }

  // 가로사진 세로사진 구분
  function onImgLoad({ target: img }) {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const pc = window.innerWidth > 460 ? true : false;
    let ratio = width / height;
    img.className = ratio > 1 ? "landscape" : "portrait";
    if (ratio > 1 && pc) {
      img.parentElement.style.display = "block";
      img.parentElement.style.marginTop = "36vmin";
      img.style.width = "70vmin";
    }
    console.log(ratio);
  }

  // useEffect(() => {
  //   setNav1(scaleSlider);
  //   setNav2(listSlider);
  // }, [scaleSlider, listSlider]);

  useEffect(() => {
    const getImage = async () => {
      if (!isDone) {
        getItem(category.format, category.subject)
          .then((response) => {
            const data = response;
            try {
              if (data.length === 0) {
                setDone(true);
                setDetail([]);
              } else {
                //메타데이터 포함 데이터 가져오는 부분
                data.map(async (image, i) => {
                  const detailResponse = await axios.get(
                    API_BASE_URL + `/api/v1/artwork/${image.id}`,
                    {
                      headers: {
                        Authorization: localStorage.getItem(ACCESS_TOKEN),
                      },
                    }
                  );
                  meta.push(detailResponse.data);
                  if (i === data.length - 1) {
                    setDetail(meta);
                    setDone(true);
                  }
                });
              }
            } catch (err) {
              console.log(err);
              setDone(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setDone(true);
          });
      }
    };
    getImage();
  }, [category]);

  if (!isDone) {
    return <LoadingIndicator />;
  } else {
    if (detail.length === 0) {
      return (
        <ContentContainer>
          <h1>사진 준비중입니다.</h1>
        </ContentContainer>
      );
    } else {
      return (
        <Fragment>
          <ContentContainer className="photo_contents" ref={scaleUp}>
            <Slider
              asNavFor={nav1}
              ref={(slider2) => (listSlider = slider2)}
              {...listSettings}
              className="list"
            >
              {detail.map((src, i) => {
                return (
                  <div key={src.filePath + src.id}>
                    <Image
                      style={{
                        backgroundImage: `url("${src.filepath}")`,
                      }}
                      onClick={() => goTo(i)}
                    >
                      {/* <img style={{width:}} src={src.filePath} alt="content" onClick={onClick} /> */}
                    </Image>
                  </div>
                );
              })}
            </Slider>
            <Slider
              asNavFor={nav2}
              ref={(slider1) => (scaleSlider = slider1)}
              {...settings}
              className="scale"
            >
              {detail.map((image, i) => {
                console.log(image);
                return (
                  <div key={i} className="swing-chip">
                    <SliderContainer className="test">
                      <img
                        src={image.filepath || ""}
                        alt="content"
                        onLoad={onImgLoad}
                      />
                      <ContentDescription>
                        <p style={{ fontWeight: "bold" }}>상세정보</p>
                        <p>제목: {image.title}</p>
                        <p>기수: {image.generation}</p>
                        <p>작가: {image.artist}</p>
                        <p>설명: {image.content}</p>
                        <p style={{ fontWeight: "bold" }}>메타데이터</p>
                        <p>기종: {`${image.exif.maker} ${image.exif.model}`}</p>
                        <p>셔터스피드: {image.exif.exposureTime}</p>
                        <p>조리개: {image.exif.aperture}</p>
                        <p>iso: {image.exif.iso}</p>
                      </ContentDescription>
                    </SliderContainer>
                  </div>
                );
              })}
            </Slider>
          </ContentContainer>
        </Fragment>
      );
    }
  }
}

export default GalleryContent;

// display: flex;
// flex-wrap: wrap;
// align-items: flex-start;
const ContentContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 60vw;
  .slick-slider.scale {
    width: 70vmax;
    align-self: center;
  }
  .slick-slider.list {
    position: absolute;
    width: 10vw;
    right: 0;
    .slick-list {
      height: 70vmin;
    }
  }
  .scale .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
  }
  .scale .slick-slide {
    height: 80vh;
  }
  .slick-next {
    right: 0;
    color: black;
    z-index: 99;
  }
  .slick-prev {
    left: 0;
    color: black;
    z-index: 99;
  }
  .scale .slick-list {
    overflow: visible;
  }

  @media only screen and (min-width: 451px) {
    .slick-slider.list {
      :hover {
        width: 20vw;
      }
    }
  }
  @media only screen and (max-width: 1150px) {
    .slick-slider.scale {
      margin-top: 45vmin;
      height: 100%;
      min-width: 480px;
      .slick-list {
        overflow: visible;
      }
    }
  }
  @media only screen and (max-width: 450px) {
    width: 100%;
    display: block;
    .slick-slider.scale {
      width: 100vw;
      margin-top: 10px;
      min-width: unset;
      .slick-list {
        overflow: hidden;
      }
    }
    .scale .slick-slide {
      height: auto;
    }

    .slick-slider.list {
      position: unset;
      width: 90vw;
      margin: auto;
      .slick-list {
        height: auto;
      }
    }
  }
`;

const Image = styled.div`
  width: 16vw;
  height: 16vw;
  background-size: cover;
  background-position: center;
`;

const SliderContainer = styled.div`
  display: flex;
  width: max-content;
  margin: 8vmin auto;
  border: 1px solid black;

  img {
    width: 50vmin;
  }
  @media (max-width: 1150px) {
    display: block;
    img {
      width: 52vmin;
    }
  }
  @media (max-width: 450px) {
    display: block;
    img {
      width: 83vmin;
    }
  }
`;

const ContentDescription = styled.div`
  width: 50vmin;
  background-color: white;
  margin-left: 10px;

  @media (max-width: 450px) {
    width: 80vmin;
  }
`;
