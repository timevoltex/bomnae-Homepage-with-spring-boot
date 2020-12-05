import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import welcome1 from "../img/welcome1.png";
import welcome2 from "../img/welcome2.png";
function Home() {
  return (
    <HomeContainer className="home-container">
      <Slider arrows={false} adaptiveHeight={true}>
        <div>
          <WelcomeTitle className="container">인사말</WelcomeTitle>
          <WelcomeContainer className="container">
            <Content>
              <img className="content" src={welcome2} />
              {/* <p className="content">
                반갑습니다. 봄내의 온라인 사진전 세계로 오신 것을 환영합니다.
                2020년은 코로나로 인해 사진전 준비에 많은 어려움이 있었습니다.
                특히 오프라인 활동에 제약이 있어 신입회원들과 관련한 활동들이
                가장 힘들었던 것 같습니다.
              </p>
              <p className="content">
                하지만 이런 와중에도 적극적으로 동아리 활동에 임해주신
                신입회원들을 포함한 모든 회원분 덕분에 이렇게 온라인으로나마
                사진전을 진행할 수 있게 되어 매우 기쁩니다. 이 자리를 통해
                사진전을 참여하신 회원분들과 응원해주신 모든 분께 감사의 인사를
                전합니다.
              </p>
              <p className="content">
                그리고 오프라인 사진전을 하지 못해 아쉽지만, 한편으로는 온라인을
                통해 좀 더 많은 분이 저희의 사진을 볼 수 있다는 사실에 기쁘기도
                합니다. 사진전에 방문하시는 모든 분이 이곳에 전시된 작품들을
                보시면서 힘을 내셨으면 좋겠습니다.
              </p>
              <p className="content">
                어두운 터널을 뚫고 빛을 따라 온라인 사진전 세계에 들어오셨던
                것처럼, 코로나라는 어두운 터널을 뚫고 밝은 미래로 나아갈 수
                있기를 바라면서 글을 마칩니다.
              </p>
              <p className="author">회장 47기 정지훈</p> */}
            </Content>
            <Content>
              <img className="content" src={welcome1} />
              {/* <p className="content">
                사진에 대한 노력의 결과를 온라인 사진전을 통해 내보이게
                되었습니다. 동기들이 하나하나 고심하고 만들어낸  결실을 사진전에
                참석하여 따뜻한 마음으로 지켜봐 주세요.
              </p>
              <p className="content">
                50기 친구들에게 의미 있고 보람찬 신인전으로 기억되길 바라며.
                많이 걷고, 많이 생각하며, 많이 찍자
              </p>
              <p className="author">50기 기장 임지은</p> */}
            </Content>
          </WelcomeContainer>
        </div>
        <div>
          <WithUs>
            <WelcomeTitle>함께한 봄내인들</WelcomeTitle>
            <p className="generation">41기</p>
            <p className="member">
              <span>권순후</span>
            </p>
            <p className="generation">42기</p>
            <p className="member">
              <span>조성일(휴)</span>
            </p>
            <p className="generation">44기</p>
            <p className="member">
              <span>김인권</span>
              <span>김재헌(휴)</span>
              <span>이조원(휴)</span>
            </p>
            <p className="generation">45기</p>
            <p className="member">
              <p>
                <span>길백호(휴)</span>
                <span>민규환</span>
                <span>박재현</span>
              </p>
              <p>
                <span>이창섭</span>
                <span>조봉준</span>

                <span>최지영(휴)</span>
              </p>
            </p>
            <p className="generation">46기</p>
            <p className="member">
              <span>이병수</span>
              <span>최현호</span>
            </p>
            <p className="generation">47기</p>
            <p className="member">
              <p>
                <span>김동균</span>
                <span>김준석</span>
                <span>김현우(휴)</span>
                <span>남경민(휴)</span>
                <span>박수연</span>
              </p>
              <p>
                <span>손민호(휴)</span>
                <span>전주한(휴)</span>
                <span>정준혁</span>
                <span>정지훈</span>
                <span>정호선</span>
              </p>
              <p>
                <span>주민규(휴)</span>
                <span>최성재(휴)</span>
                <span>추성민</span>
                <span>허원무</span>
              </p>
            </p>
            <p className="generation">48기</p>
            <p className="member">
              <p>
                <span>강성재(휴)</span>
                <span>고성연</span>
                <span>김경빈(휴)</span>
                <span>김민경(휴)</span>
                <span>김찬우(휴)</span>
              </p>
              <p>
                <span>남지수(휴)</span>
                <span>문승재(휴)</span>
                <span>박성현</span>
                <span>백종훈(휴)</span>
                <span>오세현(휴)</span>
              </p>
              <p>
                <span>유영상(휴)</span>
                <span>유우형(휴)</span>
                <span>이재서</span>
                <span>이정희</span>
                <span>이주찬(휴)</span>
              </p>
              <p>
                <span>장동환(휴)</span>
                <span>조수연</span>
                <span>조웅비(휴)</span>
                <span>조형찬(휴)</span>
                <span>홍성욱(휴)</span>
              </p>
              <p>
                <span>홍현기</span>
                <span>황주혜</span>
              </p>
            </p>
            <p className="generation">49기</p>
            <p className="member">
              <p>
                <span>김균희</span>
                <span>김남교</span>
                <span>김병수(휴)</span>
                <span>김승현(휴)</span>
                <span>김양우(휴)</span>
              </p>
              <p>
                <span>김응경</span>
                <span>김현주(휴)</span>
                <span>박호진(휴)</span>
                <span>송지원</span>
                <span>심지민(휴)</span>
              </p>
              <p>
                <span>양내원(휴)</span>
                <span>이영제</span>
                <span>이재찬(휴)</span>
                <span>이혜인</span>
                <span>장인혁(휴)</span>
              </p>
              <p>
                <span>조승혁</span>
                <span>최민형(휴)</span>
              </p>
              <span>허한길</span>
            </p>
            <p className="generation">50기</p>
            <p className="member">
              <p>
                <span>강민희</span>
                <span>강창현</span>
                <span>경민경</span>
                <span>고준원</span>
                <span>권석재</span>
              </p>
              <p>
                <span>김가현</span>
                <span>김민선</span>
                <span>김여울</span>
                <span>김예지</span>
                <span>김재민</span>
              </p>
              <p>
                <span>김정규</span>
                <span>김정은</span>
                <span>김지예</span>
                <span>김현우</span>
                <span>김혜원</span>
              </p>
              <p>
                <span>박가은</span>
                <span>박세진</span>
                <span>박혜지</span>
                <span>방민호</span>
                <span>양다을</span>
              </p>
              <p>
                <span>양정인</span>
                <span>유예담</span>
                <span>윤상혁</span>
                <span>윤지혁</span>
                <span>이나경</span>
              </p>
              <p>
                <span>이동혁</span>
                <span>이수민</span>
                <span>이예진</span>
                <span>이재호</span>
                <span>이주영</span>
              </p>
              <p>
                <span>이지민</span>
                <span>임유강</span>
                <span>임윤수</span>
                <span>임지은</span>
                <span>장상혁</span>
              </p>
              <p>
                <span>장용현</span>
                <span>정구현</span>
                <span>정호진</span>
                <span>정홍준</span>
                <span>조영주</span>
              </p>
              <p>
                <span>조원정</span>
                <span>채윤영</span>
                <span>하소진</span>
                <span>함예원</span>
              </p>
            </p>
          </WithUs>
        </div>
      </Slider>
      <Footer>
        <div>
          <h5>Copyright 2020 봄내사진예술연구회 all rights reserved.</h5>
          <h5>
            본 온라인 사진전 내의 모든 사진은 저작권법에 따라 보호받습니다.
          </h5>
        </div>
        <div>
          <h5>BE/DEPLOY: 이창섭(ventulus95@gmail.com)</h5>
          <h5>FE: 김인권(buja801@daum.net)</h5>
        </div>
      </Footer>
    </HomeContainer>
  );
}
export default Home;

const HomeContainer = styled.div`
  text-align: center;
  min-height: calc(100vh - 60px);
  overflow: auto;
  position: relative;
  width: 90vw;
  margin: 0 auto 10px auto;
  div {
    outline: none;
  }
`;

const WelcomeTitle = styled.h1`
  text-align: left;
  @media only screen and (max-width: 460px) {
    text-align: center;
    margin-left: 0;
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 460px) {
    display: block;
  }
`;

const WithUs = styled.div`
  .generation {
    font-size: 1.5em;
    font-weight: bold;
  }
  .member span {
    font-size: 1.2em;
    margin-right: 4px;
  }
  @media only screen and (max-width: 460px) {
    .member span {
      font-size: 1em;
    }
  }
`;
const Content = styled.div`
  width: 50%;
  :first-child {
    margin-right: 1vmax;
  }
  .content {
    text-align: left;
    width: 100%;
  }
  .author {
    text-align: right;
  }
  @media only screen and (max-width: 460px) {
    width: 100%;
    margin-bottom: 4vmin;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  height: 0;
  width: 90vw;
  display: flex;
  justify-content: space-between;
  text-align: left;
  h5 {
    font-size: 1rem;
  }
  @media only screen and (max-width: 460px) {
    div {
      :first-child {
        width: 32vw;
      }
      :last-child {
        margin-top: 4vmin;
      }
    }
    h5 {
      font-size: 0.4rem;
    }
  }
`;
