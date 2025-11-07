import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Button } from './ui/button';
import { CreditCard, Wallet } from 'lucide-react';

export default function WalletConnect() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  if (isConnected && address) {
    return (
      <Button onClick={() => open()} variant="outline" className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <span className="sm:hidden">Connected</span>
      </Button>
    );
  }

  return (
    <Button onClick={() => open()} className="flex items-center gap-2">
      <CreditCard className="h-5 w-5" />
      Connect Wallet
    </Button>
  );
}
