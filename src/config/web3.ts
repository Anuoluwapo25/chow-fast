import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrumSepolia } from '@reown/appkit/networks';

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID';

// 2. Set up Ethers adapter
const ethersAdapter = new EthersAdapter();

// 3. Create modal
export const modal = createAppKit({
  adapters: [ethersAdapter],
  networks: [arbitrumSepolia], // Use arbitrum for mainnet
  projectId,
  features: {
    analytics: true,
  },
  metadata: {
    name: 'Chow Fast',
    description: 'Order food on Arbitrum blockchain with Stylus',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://chow-fast.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#0faf62',
    '--w3m-border-radius-master': '2px',
  },
});

export default modal;
