import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

function Scaleup({ isScale, onScaleUp, data }) {
  console.log(data);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <OverlayContainer scale={isScale}>
      <Background onClick={onScaleUp} />
      <ContentContainer>
        <div style={{ position: "relative", width: "100%" }}>
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
            >
              <Slider {...settings}>
                {data.map((image, i) => {
                  return (
                    <div key={i}>
                      <div
                        className="test"
                        style={{ display: "flex", width: "max-content" }}
                      >
                        <img src={image.filePath} style={{ width: "50vmin" }} />
                        <div
                          style={{ width: "50vmin", backgroundColor: "white" }}
                        >
                          <p>상세정보</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </ContentContainer>
    </OverlayContainer>
  );
}

export default Scaleup;

const OverlayContainer = styled.div.attrs((props) => ({
  scale: props.scale || false,
}))`
  position: fixed;
  display: ${(props) => (props.scale ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 999;
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ContentContainer = styled.div`
  overflow: hidden;
  width: 100vmax;
  max-width: 80vmax;
  margin: 0 auto;
`;
