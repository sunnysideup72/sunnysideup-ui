import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/header/Header';
import MainContents from '../components/main/MainContents';
import Footer from '../components/common/footer/Footer';
import GlobalStyle from '../styles/GlobalStyle';

import MainVisual from '../images/main-visual.svg';

const MainLayout = styled.main`
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 130px;

  @media all and (max-width: 1280px) {
    max-width: none;
    padding: 0 50px;
  }
  @media all and (max-width: 700px) {
    padding: 0 20px;
    background: url(${MainVisual}) no-repeat;
    background-position: 160px 20%;
    background-size: 80%;
  }
`;

export default function Main() {
  return (
    <MainLayout>
      <GlobalStyle />
      <Header />
      <MainContents />
      <Footer />
    </MainLayout>
  );
}
