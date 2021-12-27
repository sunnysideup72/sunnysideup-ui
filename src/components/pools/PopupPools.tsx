import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import PoolsBg from '../../images/pools_bg.svg';
import IconClose from '../../images/x.svg';

const PopupWr = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  width: 620px;
  min-height: 645px;
  padding: 30px;
  background: url(${PoolsBg}) no-repeat top center #f5f5f5;
  border-radius: 20px;
  font-size: 30px;
  line-height: 45px;

  strong {
    margin: 30px 0 0 0;
    font-weight: 600;
  }
`;

const PopupClose = styled.button`
  position: absolute;
  top: 25px;
  right: 33px;
`;

const PoolsInput = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  height: 270px;

  p {
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    &.bold {
      font-weight: 600;
    }
  }

  .max {
    font-weight: 600;
  }

  .item {
    width: 100%;

    &:nth-child(2) {
      &:before {
        content: '+';
        display: inline-block;
        position: relative;
        left: -10px;
      }
    }
  }

  input {
    width: 100%;
    height: 65px;
    line-height: 65px;
    padding: 15px;
    background: #fff;
    border: none;
    border-radius: 10px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
`;

const PoolsSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const BtnSubmit = styled.button`
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: #ffffff;
  border-radius: 10px;
  font-size: 23px;
  font-weight: 600;
`;

export enum POPUP_TYPE {
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
}

const getTitle = (popupType: POPUP_TYPE) => {
  switch (popupType) {
    case POPUP_TYPE.REMOVE_LIQUIDITY:
      return 'Remove Liquidity';
    default:
      return '';
  }
};

const getButtonLabel = (popupType: POPUP_TYPE) => {
  switch (popupType) {
    case POPUP_TYPE.REMOVE_LIQUIDITY:
      return 'Confirm';
    default:
      return '';
  }
};

const PopupPools = forwardRef((props, ref) => {
  const [amount, setAmount] = useState(0);
  const [max, setMax] = useState(0);
  const [acceptCallback, setAcceptCallback] = useState<(amount: number) => Promise<void>>(async (amount: number) => {
    console.log(amount);
  });
  const [popupType, setPopupType] = useState(POPUP_TYPE.REMOVE_LIQUIDITY);
  const [showPopup, setPopup] = useState(false);

  useImperativeHandle(ref, () => ({
    openPopup: (maxAmount: number, popupType: POPUP_TYPE, acceptCallback: (amount: number) => Promise<void>) => {
      setMax(maxAmount);
      setAcceptCallback(acceptCallback);
      setPopupType(popupType);
      setPopup(true);
    },
  }));

  useEffect(() => {
    setAmount(0);
  }, []);

  return (
    <>
      {showPopup ? (
        <PopupWr>
          <PopupClose
            onClick={() => {
              setPopup(false);
            }}
          >
            <img src={IconClose} alt="close" />
          </PopupClose>
          <strong>{getTitle(popupType)}</strong>
          <PoolsInput>
            <div className="item">
              <div className="input-wr">
                <p className="bold">Balance</p>
                <p>
                  <span>SOL-sSOL LP</span>
                  <span className="max">{max}</span>
                </p>
              </div>
              <input
                type="text"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAmount(+e.target.value);
                }}
              />
            </div>

            <Slider
              min={0}
              max={max}
              step={0.000001}
              value={amount}
              onChange={(val) => {
                setAmount(val);
              }}
              trackStyle={{ backgroundColor: '#FFD276', height: 10 }}
              handleStyle={{
                borderColor: '#FFD276',
                height: 28,
                width: 28,
                marginLeft: 0,
                marginTop: -12,
                backgroundColor: '#FFD276',
              }}
              railStyle={{ height: 5 }}
            />
          </PoolsInput>
          <PoolsSubmit>
            <BtnSubmit
              onClick={() => {
                setPopup(false);
                acceptCallback(amount);
              }}
            >
              {getButtonLabel(popupType)}
            </BtnSubmit>
          </PoolsSubmit>
        </PopupWr>
      ) : null}
    </>
  );
});

export default PopupPools;
