import ChowFastOrderStylusABI from '../contracts/ChowFastOrderStylus.json';

// Contract deployed on Arbitrum Sepolia Testnet
export const CHOW_FAST_CONTRACT = {
  address: '0x7d9f801f94edf810b9156ce3033af75b6c01cee2' as const, // Stylus contract deployed!
  abi: ChowFastOrderStylusABI.abi,
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

export const TRANSACTION_FEE = '0.00001'; // 0.00001 ETH
