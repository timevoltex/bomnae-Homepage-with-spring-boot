import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";

function Scaleup({ isScale, onScaleUp, data, index }) {
  console.log(data);
  const [slide, setSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true,
    initialSlide: slide,
  };
  useEffect(() => {
    setSlide(index);
  }, [index]);
  return (
    <OverlayContainer scale={isScale ? 1 : 0}>
      <Background onClick={() => onScaleUp(0)} />
      <ContentContainer>
        {/* <div style={{ position: "relative", width: "100%" }}>
          <div
          style={{
            paddingBottom: "200%",
          }}
          >
          <div
          style={{
            position: "absolute",
            width: "75%",
            top: "16vmin",
            left: "8vmax",
            overflow: "hidden",
          }}
        > */}
        {console.log(`index: ${index}, slide: ${slide}`)}
        <Slider {...settings} onClick={() => onScaleUp(0)}>
          {data.map((image, i) => {
            console.log(`index is ${index}`);
            return (
              <div key={i}>
                <SliderContainer className="test">
                  <img src={image.filePath} alt="content" />
                  <ContentDescription>
                    <p>상세정보</p>
                  </ContentDescription>
                </SliderContainer>
              </div>
            );
          })}
        </Slider>
        {/* </div>
          </div>
        </div> */}
      </ContentContainer>
    </OverlayContainer>
  );
}

export default Scaleup;

const OverlayContainer = styled.div`
  position: fixed;
  display: ${(props) => (props.scale === 1 ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 999;
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ContentContainer = styled.div`
  overflow: hidden;
  width: 75%;
  max-width: 80vmax;
  margin: 0 auto;
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
