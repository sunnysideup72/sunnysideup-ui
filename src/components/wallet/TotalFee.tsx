import React from 'react';
import styled from 'styled-components';
import { useDashboard } from '../../utils/dashboard';
import { useSolanabeachInfo } from '../../utils/solanaBeach';
import { intlNumberFormat2 } from '../../utils/utils';

const TotalFeeWr = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  max-width: 603px;
  min-width: 320px;
  margin: 0 auto 75px;
  padding: 22px 31px;
  background: #ffe872;
  border: 1px solid #cecece;
  border-radius: 20px;
  text-align: left;
`;

const TotalFeeList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
`;

const TotalFeeItems = styled.li`
  width: 50%;
  margin: 10px 0 0 0;

  &:nth-child(1),
  &:nth-child(2) {
    font-weight: 600;
    color: #0500ff;
  }

  &:nth-child(even) {
    text-align: right;
  }
`;

const TotalFee = () => {
  const dashboard = useDashboard();
  const stakingInfo = useSolanabeachInfo();

  return (
    <TotalFeeWr>
      <TotalFeeList>
        <TotalFeeItems>APY</TotalFeeItems>
        <TotalFeeItems>{intlNumberFormat2(stakingInfo?.stakingInfo?.apy || 0)}%</TotalFeeItems>
        <TotalFeeItems>Total Staked</TotalFeeItems>
        <TotalFeeItems>{intlNumberFormat2(dashboard.totalStaked)} SOL</TotalFeeItems>
        <TotalFeeItems>Unstake Liqudity</TotalFeeItems>
        <TotalFeeItems>{intlNumberFormat2(dashboard.unstakeLiqudity)} SOL</TotalFeeItems>
      </TotalFeeList>
    </TotalFeeWr>
  );
};

export default TotalFee;
