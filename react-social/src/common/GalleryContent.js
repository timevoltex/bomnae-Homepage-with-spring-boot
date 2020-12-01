import React, { useRef, Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { getItem } from "./getItem";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import axios from "axios";

function GalleryContent({ category, isDone }) {
  const scaleUp = useRef(document.createElement("div"));
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [navIndex, setNavIndex] = useState(0);
  let scaleSlider = [];
  let listSlider = [];

  const [item, setItem] = useState([]);
  const meta = [];
  const [detail, setDetail] = useState([]);

  const getImage = async () => {
    if (!isDone) {
      getItem(category.format, category.subject)
        .then((response) => {
          const data = response;
          setItem(data);
          try {
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
            });
            setDetail(meta);
            isDone = true;
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getImage();
  }, [category]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true,
    beforeChange: (_, next) => {
      setNavIndex(next);
    },
  };

  const listSettings = {
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 500,
    infinite: true,
    dots: false,
    beforeChange: (_, next) => {
      setNavIndex(next);
    },
  };
  function goTo(index) {
    setNavIndex(index);
    scaleSlider.slickGoTo(navIndex);
    listSlider.slickGoTo(navIndex);
  }
  useEffect(() => {
    setNav1(scaleSlider);
    setNav2(listSlider);
  }, [scaleSlider, listSlider]);

  return (
    <Fragment>
      <ContentContainer className="photo_contents" ref={scaleUp}>
        <Slider
          asNavFor={nav2}
          ref={(slider1) => (scaleSlider = slider1)}
          {...settings}
        >
          {detail.map((image, i) => {
            return (
              <div key={i}>
                <SliderContainer className="test">
                  <img src={image.filepath} alt="content" />
                  <ContentDescription>
                    <p>상세정보</p>
                    <p>제목: {image.title}</p>
                    <p>설명: {image.content}</p>
                    <p>작가: {image.artist}</p>
                  </ContentDescription>
                </SliderContainer>
              </div>
            );
          })}
        </Slider>
        <Slider
          asNavFor={nav1}
          ref={(slider2) => (listSlider = slider2)}
          {...listSettings}
          className="list-slider"
        >
          {item.map((src, i) => {
            return (
              <div key={src.filePath}>
                <Image
                  style={{
                    backgroundImage: `url("${src.filePath}")`,
                  }}
                  onClick={() => goTo(i)}
                >
                  {/* <img style={{width:}} src={src.filePath} alt="content" onClick={onClick} /> */}
                </Image>
              </div>
            );
          })}
        </Slider>
      </ContentContainer>
    </Fragment>
  );
}

export default GalleryContent;

// display: flex;
// flex-wrap: wrap;
// align-items: flex-start;
const ContentContainer = styled.div`
  .slick-slider {
    width: 70vw;
  }
  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
  }
  .slick-next {
    right: 0;
  }
  .slick-prev {
    left: 0;
  }
`;

const Image = styled.div`
  width: 27vw;
  height: 27vw;
  background-size: cover;
  background-position: center;
`;
const SliderContainer = styled.div`
  display: flex;
  width: max-content;
  margin: 13vmin auto;

  img {
    width: 50vmin;
  }
`;

const ContentDescription = styled.div`
  width: 50vmin;
  background-color: white;
`;
