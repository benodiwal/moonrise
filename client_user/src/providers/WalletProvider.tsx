import { FC, ReactNode, useMemo } from "react"
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletsProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const network = WalletAdapterNetwork.Mainnet;
    const wallets = useMemo(
        () => [],
        [network]
        );

  return (
        <WalletProvider autoConnect wallets={wallets}>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
  )
}

export default WalletsProvider;
