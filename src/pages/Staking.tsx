import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../components/common/header/Header';
import ContHead from '../components/common/ContHead';
import Wallet from '../components/wallet/Wallet';
import TotalFee from '../components/wallet/TotalFee';
import StakingBox from '../components/staking/StakingBox';
import UnstakeBox from '../components/staking/UnstakeBox';
import Footer from '../components/common/footer/Footer';
import GlobalStyle from '../styles/GlobalStyle';
import { SwitchWr, BtnSwitch } from '../components/staking/style';

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

const SELECT_TAB = {
  STAKING: 'STAKING',
  UNSTAKING: 'UNSTAKING',
} as const;
type SELECT_TAB = typeof SELECT_TAB[keyof typeof SELECT_TAB];

const Staking = () => {
  const [tab, selectTab] = useState<SELECT_TAB>(SELECT_TAB.STAKING);

  return (
    <ContLayout>
      <GlobalStyle />
      <Header />
      <Wallet />
      <ContWr>
        <ContHead tit="Stake" subTit="Stake SOL and receive sSOL" />

        <TotalFee />

        <SwitchWr>
          <BtnSwitch>
            <button
              className={SELECT_TAB.STAKING === tab ? 'on' : ''}
              type="button"
              onClick={() => {
                selectTab(SELECT_TAB.STAKING);
              }}
            >
              STAKE
            </button>
            <button
              className={SELECT_TAB.UNSTAKING === tab ? 'on' : ''}
              type="button"
              onClick={() => {
                selectTab(SELECT_TAB.UNSTAKING);
              }}
            >
              UNSTAKE
            </button>
          </BtnSwitch>
        </SwitchWr>

        {tab === SELECT_TAB.STAKING ? <StakingBox /> : <UnstakeBox />}
      </ContWr>
      <Footer />
    </ContLayout>
  );
};

export default Staking;
