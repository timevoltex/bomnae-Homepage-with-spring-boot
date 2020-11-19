import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

function Scaleup({isScale}) {
    return(
        <Container scale={isScale}>
            <Background/>
            <Content>
                <Slider>
                    
                </Slider>
            </Content>
        </Container>

    )
}

export default Scaleup

const Container = styled.div.attrs(props => ({
    scale: props.scale || false
}))`
    position: fixed;
    display: ${props => props.scale ? "block" : "none"};
    width: 100vw;
    height: 100vh;
    top:0;
    z-index:999;
`;
const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
`;

const Content = styled.div`
    position:absolute;
`