import React, { Fragment } from "react";
import Poster from "../img/poster.jpeg";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function Main() {
  return (
    <Fragment>
      <MainContainer>
        <PosterImage src={Poster} alt="MainPage" />
        <Open to="/home">
          <InnerCircle delay={0} />
          <InnerCircle delay={0.25} />
          <InnerCircle delay={0.5} />
          <InnerCircle delay={0.75} />
          <InnerCircle delay={1} />
        </Open>
      </MainContainer>
    </Fragment>
  );
}
export default Main;

const openAnimate1 = keyframes`

  to{
    transform: rotateX(45deg) rotateY(45deg) rotate(1turn)
    }
`;
const openAnimate2 = keyframes`

  to{
    transform: rotateX(90deg) rotateY(90deg) rotate(1turn)
    }
`;
const openAnimate3 = keyframes`

  to{
    transform: rotateX(135deg) rotateY(135deg) rotate(1turn)
    }
`;
const openAnimate4 = keyframes`

  to{
    transform:  rotateY(140deg) rotate(1turn)
    }
`;
const openAnimate5 = keyframes`

  to{
    transform: rotateX(75deg) rotateY(30deg) rotate(1turn)
    }
`;

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #313131;
  @media only screen and (max-width: 460px) {
    height: 100vh;
  }
`;

const PosterImage = styled.img`
  width: 50vw;
  margin: 0 auto;
  @media (max-width: 450px) {
    width: 100vw;
    margin: auto;
  }
`;

const Open = styled(NavLink)`
  position: absolute;
  transform: translate(-2vmax, 43vmax);
  width: 15vmax;
  height: 36vmin;
  @media only screen and (max-width: 460px) {
    transform: translate(-2vmax, 60vmax);
  }
`;

const InnerCircle = styled.div`
  position: absolute;
  border: 1em solid white;
  opacity: 0.5;
  border-radius: 10em;
  width: 100%;
  height: 100%;
  &:first-child {
    border-bottom: none;
    border-right: none;
    transform: transition(0, 0) rotateY(45deg) rotateX(45deg) rotate(0);
    animation: ${openAnimate1} 3s linear alternate infinite
      ${(props) => props.delay}s;
  }
  &:nth-child(2) {
    border-bottom: none;
    border-right: none;
    transform: transition(0, 0) rotateY(90deg) rotateX(90deg) rotate(0);
    animation: ${openAnimate2} 3s linear alternate infinite
      ${(props) => props.delay}s;
  }
  &:nth-child(3) {
    border-bottom: none;
    border-right: none;
    transform: transition(0, 0) rotateY(135deg) rotateX(135deg) rotate(0);
    animation: ${openAnimate3} 3s linear alternate infinite
      ${(props) => props.delay}s;
  }
  &:nth-child(4) {
    border-bottom: none;
    border-right: none;
    transform: transition(0, 0) rotateY(140deg) rotate(0);
    animation: ${openAnimate4} 3s linear alternate infinite
      ${(props) => props.delay}s;
  }
  &:last-child {
    border-bottom: none;
    border-right: none;
    transform: transition(0, 0) rotateY(30deg) rotateX(75deg) rotate(0);
    animation: ${openAnimate5} 3s linear alternate infinite
      ${(props) => props.delay}s;
  }
  @media only screen and (max-width: 460px) {
    border: 0.5em solid white;
  }
`;
