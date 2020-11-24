import React, { useRef, Fragment } from "react";
import styled from "styled-components";

function GalleryContent({ data, onClick }) {
  const scaleUp = useRef(document.createElement("div"));
  return (
    <Fragment>
      <div
        className="photo_contents"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}
        ref={scaleUp}
      >
        {data.map((src, i) => {
          return (
            <Image
              key={i}
              style={{
                backgroundImage: `url("${src.filePath}")`,
              }}
              onClick={onClick}
            >
              {/* <img style={{width:}} src={src.filePath} alt="content" onClick={onClick} /> */}
            </Image>
          );
        })}
      </div>
    </Fragment>
  );
}

export default GalleryContent;

const Image = styled.div`
  width: 40vw;
  height: 40vw;
  background-size: cover;
  background-position: center;
`;
