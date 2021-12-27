import styled from 'styled-components';

export const SwitchWr = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
`;

export const BtnSwitch = styled.div`
  button {
    width: 148px;
    height: 48px;
    line-height: 48px;
    margin: 0 8px 0 0;
    border: 1px solid #cecece;
    border-bottom: 0;
    border-radius: 8px 8px 0 0;
    background: #ffe872;
    font-size: 16px;
    font-weight: 600;
    opacity: 0.5;

    &.on {
      opacity: 1;
    }
  }
`;

export const ToggleWr = styled.div`
  .switch {
    position: absolute;
    left: -9999px;
  }
  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 295px;
    height: 43px;
    background: transparent;
    border-radius: 120px;
    border: solid 1px #c6c6c6;
    -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    :before {
      content: 'Unstake now';
      left: 32px;
      color: #434343;
    }

    :after {
      content: 'Delayed unstake';
      right: 25px;
      color: #bbb;
    }

    :before,
    :after {
      position: absolute;
      top: 10px;
      z-index: 2;
      -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      font-size: 12px;
    }
    &.on {
      background: transparent;
    }

    &.on:after {
      color: #434343;
    }
    &.on::before {
      color: #bbb;
    }
    &.on .toggle-handler {
      -webkit-transform: translateX(65px);
      transform: translateX(65px);
      border-color: #fff;
    }
  }
  .toggle-handler {
    display: inline-block;
    position: relative;
    top: 3.4px;
    left: 5px;
    z-index: 1;
    width: 142px;
    height: 35px;
    background: #ffe872;
    border-radius: 120px;
    -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    -webkit-transform: translateX(-77px);
    transform: translateX(-77px);
  }
`;

export const StakingLayout = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #cecece;
  border-radius: 0 20px 20px 20px;
`;

export const TotalWr = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
`;

export const TotalItems = styled.li`
  width: 50%;
  margin: 10px 0 0 0;
  text-align: left;
  color: #afafaf;

  &.blue {
    color: #366efe;
  }

  &:nth-child(even) {
    text-align: right;
  }

  &.note {
    width: 100%;
    padding: 10px 0;
    border: solid 1px #000;
    border-radius: 5px;
    text-align: center;
  }

  i {
    position: relative;
    top: 2px;
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 0 0 0 4px;
    line-height: 21px;
    border-radius: 50%;
    background: #ffe872;
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
`;

export const BtnStakes = styled.button`
  width: 100%;
  height: 67px;
  margin: 38px 0 0 0;
  background: #ffe872;
  border-radius: 10px;
  font-size: 20px;
  line-height: 67px;
  text-align: center;
  font-weight: 600;

  @media all and (max-width: 700px) {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
`;

export const StakingTit = styled.h3`
  margin: 0 0 29px 0;
  line-height: 30px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

export const InputWr = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 17px 0 15px;
  margin: 0 0 27px 0;
  border: 1px solid #cecece;
  border-radius: 10px;
`;

export const TokenUnit = styled.i`
  display: block;
  width: 36px;
  height: 36px;
  margin: 0 15px 0 0;

  > img {
    width: 100%;
    height: 100%;
  }
`;

export const TokenAmout = styled.input`
  width: calc(100% - 125px);
  height: 100%;
  color: #858585;
  border: 0;
  outline: 0;
  font-size: 16px;
`;

export const BtnMax = styled.button`
  width: 50px;
  height: 30px;
  line-height: 30px;
  background: #ffe872;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
`;

export const TxtGray = styled.span`
  width: 67px;
  color: #858585;
  font-size: 20px;
  font-weight: 400;
  text-align: right;
`;

export const TicketWr = styled.div`
  position: relative;
  margin: 33px 0 0 0;
  padding: 29px 0 0 0;
  line-height: 24px;
  font-size: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -10%;
    display: block;
    width: 120%;
    height: 1px;
    border-top: 1px dashed #cabfbf;
  }
`;

export const NoPending = styled.p`
  margin: 13px 0 0 0;
  font-size: 10px;
  font-weight: 300;
  text-align: left;
  color: #bdbdbd;
`;

export const TicketTit = styled.h4`
  font-weight: 600;
  text-align: left;
`;

export const TicketItem = styled.li`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 11px 0;
`;

export const TicketStatus = styled.button`
  width: 140px;
  height: 31px;
  line-height: 31px;
  border-radius: 20px;
  font-size: 12px;

  &.completed {
    background: #a9e2ce;
  }
  &.pending {
    background: #ffb876;
  }
`;
