import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import {
  getLedgerWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getSolongWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, useMemo } from 'react';

import { DashboardProvider } from './utils/dashboard';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './Routes';

import '@solana/wallet-adapter-react-ui/styles.css';

const Wallet: FC = () => {
  const network =
    process.env.REACT_APP_SOLANA_API_ENDPOINT === 'https://api.devnet.solana.com'
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets imports all the adapters but supports tree shaking --
  // Only the wallets you want to support will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWebWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getLedgerWallet(),
      getSolongWallet(),
    ],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={(e: WalletError) => {
          if (e && e.message) {
            toast.error(e.message);
          }
        }}
      >
        <DashboardProvider>
          <WalletModalProvider featuredWallets={5}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </WalletModalProvider>
        </DashboardProvider>
      </WalletProvider>
      <ToastContainer position="bottom-left" autoClose={5000} pauseOnHover pauseOnFocusLoss closeOnClick={false} />
    </ConnectionProvider>
  );
};

export default Wallet;
