// import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
// import { Button } from './ui/button';
// import { CreditCard, Wallet } from 'lucide-react';

// export default function WalletConnect() {

//   const { open } = useAppKit();
//   const { address, isConnected } = useAppKitAccount();

//   if (isConnected && address) {
//     return (
//       <Button onClick={() => open()} variant="outline" className="flex items-center gap-2">
//         <Wallet className="h-4 w-4" />
//         <span className="hidden sm:inline">
//           {address.slice(0, 6)}...{address.slice(-4)}
//         </span>
//         <span className="sm:hidden">Connected</span>
//       </Button>
//     );
//   }

//   return (
//     <Button onClick={() => open()} className="flex items-center gap-2">
//       <CreditCard className="h-5 w-5" />
//       Connect Wallet
//     </Button>
//   );
// }

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from './ui/button';
import { CreditCard, Wallet } from 'lucide-react';

export default function WalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button 
                    onClick={openConnectModal} 
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex gap-2">
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden sm:inline">{chain.name}</span>
                  </Button>

                  <Button
                    onClick={openAccountModal}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {account.displayName}
                    </span>
                    <span className="sm:hidden">Account</span>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}