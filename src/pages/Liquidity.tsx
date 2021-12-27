import React, { useRef } from 'react';
import styled from 'styled-components';

import Header from '../components/common/header/Header';
import ContHead from '../components/common/ContHead';
import LiquidityBox from '../components/liquidity/LiquidityBox';
import Tickets from '../components/liquidity/Tickets';
import Footer from '../components/common/footer/Footer';
import GlobalStyle from '../styles/GlobalStyle';
import PopupPools from '../components/pools/PopupPools';

const ContLayout = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 130px;

  @media all and (max-width: 1440px) {
    max-width: none;
    padding: 0 50px;
  }
  @media all and (max-width: 700px) {
    padding: 0 20px;
  }
`;
const ContWr = styled.section`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  max-width: 603px;
  min-width: 320px;
  margin: 0 auto 98px;
`;

const Liquidity = () => {
  const liquidityBoxRef = useRef({});
  const popupRef = useRef({});

  return (
    <ContLayout>
      <GlobalStyle />
      <Header />
      <ContWr>
        <ContHead tit="Add Liquidity" subTit="Receive LP tokens to participate in crypto farms" />
        <LiquidityBox ref={liquidityBoxRef} />
        <Tickets liquidityBoxRef={liquidityBoxRef} popupRef={popupRef} />
      </ContWr>
      <PopupPools ref={popupRef} />
      <Footer />
    </ContLayout>
  );
};

export default Liquidity;
