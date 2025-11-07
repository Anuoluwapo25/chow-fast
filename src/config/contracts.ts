import ChowFastOrderABI from '../contracts/ChowFastOrder.json';

// Contract deployed on Arbitrum Sepolia (update this after deployment)
export const CHOW_FAST_CONTRACT = {
  address: '0x0000000000000000000000000000000000000000' as const, // Update after deploying Stylus contract
  abi: ChowFastOrderABI.abi,
} as const;

// Network configurations
export const ARBITRUM_SEPOLIA = {
  chainId: 421614,
  name: 'Arbitrum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
} as const;

export const ARBITRUM_ONE = {
  chainId: 42161,
  name: 'Arbitrum One',
  currency: 'ETH',
  explorerUrl: 'https://arbiscan.io',
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
} as const;

// Transaction fee from contract
export const TRANSACTION_FEE = '0.00001'; // 0.00001 ETH
