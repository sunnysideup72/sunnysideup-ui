import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/common/header/Header';
import ContHead from '../components/common/ContHead';
import Wallet from '../components/wallet/Wallet';
import SwapBox from '../components/swap/SwapBox';
import Raydium from '../images/raydium.svg';
import Footer from '../components/common/footer/Footer';
import GlobalStyle from '../styles/GlobalStyle';

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

const Powered = styled.div`
  width: 100%;
  margin: 130px 0 0 0;
`;

const PoweredLink = styled(Link)`
  text-decoration: none;

  p {
    margin: 0 0 10px 0;
    font-weight: 300;
    color: #000;
  }

  img {
    width: 150px;
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

const Staking = () => {
  return (
    <ContLayout>
      <GlobalStyle />
      <Header />
      <ContWr>
        <ContHead tit="Swap" subTit="" />
        <Wallet />
        <SwapBox />
        <Powered>
          <PoweredLink to="https://raydium.io/">
            <p>Powered by</p>
            <img src={Raydium} alt="raydium logo" />
          </PoweredLink>
        </Powered>
      </ContWr>
      <Footer />
    </ContLayout>
  );
};

export default Staking;
