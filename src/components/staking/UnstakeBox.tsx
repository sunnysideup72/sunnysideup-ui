import React, { useState } from 'react';
import styled from 'styled-components';

import { StakingLayout, StakingTit, ToggleWr } from './style';

import UnstakeNow from './UnstakeNow';
import DelayedUnstake from './DelayedUnstake';

const SwitchWr = styled.div`
  margin: 0 0 46px 0;
  text-align: center;
`;

const UnstakeBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <StakingLayout>
        <SwitchWr>
          <StakingTit>Unstake</StakingTit>
          <ToggleWr>
            <label
              htmlFor="switch"
              className={isChecked ? 'toggle on' : 'toggle'}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            >
              <span className="toggle-handler" />
              <input type="checkbox" id="switch" className="switch" />
            </label>
          </ToggleWr>
        </SwitchWr>

        {!isChecked ? <UnstakeNow /> : <DelayedUnstake />}
      </StakingLayout>
    </>
  );
};

export default UnstakeBox;
