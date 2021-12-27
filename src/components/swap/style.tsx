import styled from 'styled-components';
import tooltip from '../../images/tooltip.svg';
import TokenSolana from '../../images/token_solana.svg';
import TokenSSolImg from '../../images/token_ssol.svg';
import TokenSSUImg from '../../images/token_ssu.svg';

export const SwapTop = styled.div`
  width: 100%;
  padding: 30px;
  background: #ffe872;
  border: 1px solid #cecece;
  border-radius: 20px 20px 0 0;

  .css-1okebmr-indicatorSeparator {
    background-color: transparent;
  }
  .css-tlfecz-indicatorContainer {
    color: #3e3a3a;
  }
`;

export const SwapBottom = styled.div`
  position: relative;
  top: -15px;
  width: 100%;
  padding: 0 30px;
  background: #fff;
  border: 1px solid #cecece;
  border-top: 0;
  border-radius: 20px;
`;

export const RouteBox = styled.div`
  padding: 0 20px;
`;

export const RouteInfo = styled.p`
  margin: 30px 0 0 0;
  text-align: left;

  img {
    margin: 0 0 0 8px;
  }
`;

export const TokenToWr = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0 27px 0;

  img {
    border-radius: 50%;
  }
`;

export const TokenTo = styled.p`
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  span {
    margin: 0 0 0 6px;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const SwapPrice = styled.div``;

export const SwapTit = styled.h3`
  margin: 0 0 30px 0;
  line-height: 30px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

export const Balance = styled.div`
  margin: 0 10px 0 0;
  font-weight: 600;
  text-align: right;
`;

export const SwapItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 12px 0;
  padding: 15px 20px;
  background: #fffceb;
  border-radius: 10px;
  text-align: left;

  .left-box {
    width: calc(100% - 160px);
    height: 100%;
    > input {
      margin: 6px 0 0 0;
      border: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: transparent;
      font-size: 20px;
    }
  }
`;

export const BtnHalf = styled.button`
  width: 50px;
  height: 30px;
  line-height: 30px;
  background: #ffe872;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  margin: 0 3px;
`;

export const SelectSol = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 7px 0 0;
  background: url(${TokenSolana}) no-repeat;
  background-size: contain;
  vertical-align: middle;
`;

export const SelectSSol = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 7px 0 0;
  background: url(${TokenSSolImg}) no-repeat;
  background-size: contain;
  vertical-align: middle;
`;

export const Txt = styled.p`
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

export const TotalSwap = styled.ul`
  width: 100%;
  padding: 25px 20px;
  background: #f6f6f6;
  border-radius: 20px;

  li {
    display: inline-block;
    margin: 0 0 8px 0;
  }

  .rate {
    margin: 0 0 24px 0;
    //width: 30px;
  }
`;

export const ToolTip = styled.span`
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 0 0 5px;
  background: url(${tooltip});
  background-size: contain;

  &:hover p {
    display: block;
  }
`;

export const ToolTipBox = styled.p`
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  padding: 10px;
  line-height: 15px;
  background: #fff;
  border-radius: 2px;
  font-size: 10px;
  white-space: nowrap;
`;

export const TotalSwapTit = styled.li`
  width: 160px;

  &:last-child {
    font-weight: 600;
  }

  .tip-wr {
    display: flex;
    align-items: center;

    i {
      position: relative;
      display: inline-block;
      margin: 0 0 0 4px;
      cursor: pointer;

      span {
        position: absolute;
        top: 5px;
        left: 5px;
        z-index: 3;
        display: none;
        min-width: 294px;
        padding: 13px;
        background: #e6e3e3;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #3e3a3a;
      }

      &:hover {
        cursor: default;

        span {
          display: block;
        }
      }
    }
  }
`;

export const TotalSwapFee = styled.li`
  width: calc(100% - 160px);
  font-weight: 600;
  text-align: right;

  span {
    margin: 0 1px;

    img {
      margin: 0 10px 0 0;
    }
  }

  .sub-txt {
    font-size: 10px;
    font-weight: 400;
  }
`;

export const BtnSwap = styled.button`
  width: 100%;
  height: 67px;
  margin: 28px 0;
  background: #ffe872;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 67px;
  text-align: center;
`;

export const BtnNot = styled.button`
  width: 100%;
  height: 67px;
  margin: 28px 0;
  background: #eeece7;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 67px;
  text-align: center;
`;

export const Warning = styled.p`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 30px auto 0;

  p {
    margin: 0 0 0 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: left;
  }
`;

export const TokenSol = styled.i`
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 18px 0 0;
  background: url(${TokenSolana});
  background-size: contain;
`;

export const TokenSSol = styled.i`
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 18px 0 0;
  background: url(${TokenSSolImg});
  background-size: contain;
`;

export const TokenSSU = styled.i`
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 18px 0 0;
  background: url(${TokenSSUImg});
  background-size: contain;
`;
