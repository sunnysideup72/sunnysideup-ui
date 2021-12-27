import React from 'react';
import styled from 'styled-components';

type NotificationProps = { msg: string; signature?: string };

export const MessageBox = styled.div``;

export const MessageText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export const MessageLink = styled.div`
  font-size: 12px;
  color: #177ddc;
  margin: 4px;

  a {
    color: #177ddc;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
`;

const Notification: React.FC<NotificationProps> = ({ msg, signature }) => {
  return (
    <MessageBox>
      <MessageText>{msg}</MessageText>
      {signature ? (
        <MessageLink>
          <a
            href={`https://explorer.solana.com/tx/${signature}${process.env.REACT_APP_CLUSTER || ''}`}
            target="_blank"
            rel="noreferrer"
          >
            View Transaction {signature.slice(0, 7)}...{signature.slice(-7)}
          </a>
        </MessageLink>
      ) : null}
    </MessageBox>
  );
};

Notification.defaultProps = {
  signature: '',
};

export { Notification };
