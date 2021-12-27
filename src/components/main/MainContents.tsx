import React from 'react';
import styled from 'styled-components';

import Status from '../common/Status';
import MainVisual from '../../images/main-visual.svg';
import MainTit from '../../images/main_tit.svg';

const Container = styled.section`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  height: calc(100vh - 300px);
  min-height: 424px;
  background: url(${MainVisual});
  background-position: right center;
  background-size: 30%;
  background-repeat: no-repeat;

  img {
    width: 100%;
    max-width: 676px;
  }

  @media all and (max-width: 700px) {
    align-content: flex-end;
    height: calc(100vh - 190px);
    background: none;
  }
`;

const BtnStaking = styled.button`
  width: 200px;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  background: #ffe872;
  border-radius: 10px;

  @media all and (max-width: 700px) {
    position: fixed;
    left: 50%;
    bottom: 31px;
    z-index: 2;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    font-size: 16px;
  }
`;

export default function Main() {
  return (
    <Container>
      <img src={MainTit} alt="main title" />
      <Status />
      <BtnStaking>Start Staking</BtnStaking>
    </Container>
  );
}
