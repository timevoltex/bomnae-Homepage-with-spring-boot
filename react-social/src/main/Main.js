import React, { Fragment } from "react";
import Poster from "../img/poster.jpeg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Main() {
  return (
    <Fragment>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#313131",
        }}
      >
        <PosterImage src={Poster} alt="MainPage" />
        <NavLink
          to="/home"
          style={{
            position: "fixed",
            transform: "translate(0, 30vmax)",
            width: "15vmax",
            height: "36vmin",
          }}
        >
          <div
            className="enter"
            style={{ width: "15vmax", height: "36vmin" }}
          ></div>
        </NavLink>
      </div>
    </Fragment>
  );
}
export default Main;

const PosterImage = styled.img`
  width: 50vw;
  height: 100vh;
  margin: 0 auto;
  @media (max-width: 450px) {
    width: 100vw;
    margin: auto;
  }
`;
