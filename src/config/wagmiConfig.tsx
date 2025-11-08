import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, arbitrumSepolia } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Chow Fast',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'a57f6a630362fdc53139d4d5fd7dcd59',
  chains: [arbitrumSepolia, arbitrum],
  ssr: false, // Set to true if using server-side rendering
});

export const CHOW_FAST_CONTRACT = {
  address: '0x0000000000000000000000000000000000000000' as const,
  abi: [], // Import your ABI here
} as const;

export const TRANSACTION_FEE = '0.00001'; 