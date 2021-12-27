import React from 'react';
import styled from 'styled-components';
import Info from '../../images/info.svg';
import Close from '../../images/x.svg';

const PopupWr = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 402px;
  min-height: 122px;
  padding: 23px 17px 29px 45px;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
  border-radius: 5px;
  text-align: left;
`;

const PopupIcon = styled.i`
  position: absolute;
  top: 26px;
  left: 19px;
  display: block;
  width: 17px;
  height: 20px;
  background: url(${Info}) no-repeat;
`;

const PopupClose = styled.button`
  position: absolute;
  top: 12px;
  right: 17px;
  width: 8px;
  height: 8px;
  background: url(${Close}) no-repeat;
  background-size: contain;
`;

const PopupTit = styled.strong`
  display: block;
  margin: 0 0 9px 0;
  font-weight: 600;
`;

const PopupTxt = styled.p`
  line-height: 18px;
  font-size: 12px;
`;

const PopupError = () => {
  return (
    <PopupWr>
      <PopupIcon />
      <PopupClose />
      <PopupTit>Transaction has been completed</PopupTit>
      <PopupTxt>
        Confirmation is in progress. You can check your transaction by clicking here or via the wallet tab.
      </PopupTxt>
    </PopupWr>
  );
};

export default PopupError;
