import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

function Scaleup({ isScale, onScaleUp, data }) {
  console.log(data);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <Container scale={isScale}>
      <Background onClick={onScaleUp} />
      <Content>
        <Slider {...settings}>
          {data.map((image, i) => {
            return (
              <div key={i}>
                <img
                  src={image.filePath}
                  style={{ width: "50%", height: "50%" }}
                />
              </div>
            );
          })}
        </Slider>
      </Content>
    </Container>
  );
}

export default Scaleup;

const Container = styled.div.attrs((props) => ({
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
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  width: 500px;
  transform: translate(30vw, 50vh);
`;
