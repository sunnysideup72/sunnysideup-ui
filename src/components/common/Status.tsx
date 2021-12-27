import React from 'react';
import styled from 'styled-components';
import { SolanabeachStatus, useSolanabeachInfo } from '../../utils/solanaBeach';
import { intlNumberFormat2 } from '../../utils/utils';
import { useDashboard } from '../../utils/dashboard';

const Status = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 2vh 0 9vh 0;
  font-weight: 600;
`;

const BoxStatus = styled.article`
  display: flex;
  margin: 0 54px 25px 0;
  line-height: 24px;
  font-size: 16px;

  @media all and (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }

  @media all and (max-width: 700px) {
    font-size: 14px;
  }
`;

const TitStatus = styled.h3``;

const ContentsStatus = styled.p`
  margin: 0 0 0 20px;
`;

const ListStatus = () => {
  const dashboard = useDashboard();
  const stakingInfo = useSolanabeachInfo();

  const apy = () => {
    return stakingInfo && stakingInfo.status === SolanabeachStatus.Success ? (
      <>
        <span className="dashboard__approx">≈</span>
        {intlNumberFormat2(stakingInfo.stakingInfo?.apy || 0)}
        <span className="dashboard__unit">%</span>
      </>
    ) : (
      <>-</>
    );
  };

  const totalStatus = () => {
    return <>{intlNumberFormat2(dashboard.totalStaked)}</>;
  };

  return (
    <Status>
      <BoxStatus>
        <TitStatus>Total Staked:</TitStatus>
        <ContentsStatus>{totalStatus()} SOL</ContentsStatus>
      </BoxStatus>
      <BoxStatus>
        <TitStatus>Staking APY:</TitStatus>
        <ContentsStatus>{apy()}</ContentsStatus>
      </BoxStatus>
      {/* <BoxStatus> */}
      {/*   <TitStatus>TVL:</TitStatus> */}
      {/*   <ContentsStatus>**00000.00000</ContentsStatus> */}
      {/* </BoxStatus> */}
    </Status>
  );
};

export default ListStatus;
