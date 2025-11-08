# Chow Fast - Food Ordering on Arbitrum with Stylus

Chow Fast is a decentralized food ordering platform built on Arbitrum blockchain, powered by **Stylus smart contracts**. This project is a migration from fast-snack (Solidity) to use Arbitrum Stylus (Rust) for improved gas efficiency and performance.

## 🎉 Deployed Contract

The Chow Fast ordering system is **live on Arbitrum Sepolia testnet**!

- **Contract Address**: [`0x7d9f801f94edf810b9156ce3033af75b6c01cee2`](https://sepolia.arbiscan.io/address/0x7d9f801f94edf810b9156ce3033af75b6c01cee2)
- **Network**: Arbitrum Sepolia Testnet
- **Chain ID**: 421614
- **Contract Type**: Arbitrum Stylus (Rust/WASM)
- **Size**: 22.1 KiB (optimized, under 24 KB limit)
- **Deployment TX**: [`0x65d1f7c73ddb0d9b22d2a111291c05e17eef7188676a55791b35d315d92a9673`](https://sepolia.arbiscan.io/tx/0x65d1f7c73ddb0d9b22d2a111291c05e17eef7188676a55791b35d315d92a9673)
- **Activation TX**: [`0x53993114e30d04747c0f7e727b057f5a1cfca23cfd9ed623b8f516238c1241df`](https://sepolia.arbiscan.io/tx/0x53993114e30d04747c0f7e727b057f5a1cfca23cfd9ed623b8f516238c1241df)

### Interact with the Contract

- **View on Arbiscan**: [https://sepolia.arbiscan.io/address/0x7d9f801f94edf810b9156ce3033af75b6c01cee2](https://sepolia.arbiscan.io/address/0x7d9f801f94edf810b9156ce3033af75b6c01cee2)
- **Live App**: [Your deployed frontend URL here]
- **Contract Source**: `contracts/stylus/src/lib.rs`

## 🚀 Key Features

- **Arbitrum Stylus Smart Contracts**: Written in Rust, compiled to WASM for 50-90% gas savings
- **Web3 Wallet Integration**: Connect with MetaMask, Coinbase Wallet, Rainbow, and more
- **Real-time Order Tracking**: All orders stored on-chain
- **React + TypeScript Frontend**: Modern, responsive UI
- **Decentralized Payments**: Pay with ETH on Arbitrum
- **Checkout Flow**: Complete order processing with delivery information

## 📁 Project Structure

```
chow-fast/
├── contracts/
│   └── stylus/           # Arbitrum Stylus (Rust) contracts
│       ├── src/
│       │   └── lib.rs    # Main contract logic
│       ├── scripts/
│       │   ├── deploy.sh       # Deployment script
│       │   └── export-abi.sh   # ABI export script
│       ├── Cargo.toml    # Rust dependencies
│       └── README.md     # Stylus contract documentation
├── src/
│   ├── components/       # React components
│   ├── config/          # Contract & Web3 configuration
│   ├── contracts/       # Contract ABIs
│   ├── hooks/           # React hooks including contract hooks
│   ├── pages/           # Page components
│   ├── styles/          # CSS styles
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── package.json         # Frontend dependencies and scripts
└── README.md           # This file
```

## 🛠️ Prerequisites

### For Frontend Development

- Node.js >= 18.x
- npm or yarn
- Git

### For Contract Development

- Rust (latest stable)
- cargo-stylus tool
- wasm32-unknown-unknown target

## 📦 Installation

### 1. Frontend Setup

```bash
# Navigate to project root
cd chow-fast

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env and add your Reown (WalletConnect) Project ID
# Get one at: https://cloud.reown.com
```

### 2. Contract Setup

```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Stylus CLI tools
cargo install --force cargo-stylus cargo-stylus-check

# Add WASM target
rustup target add wasm32-unknown-unknown

# Verify installation
cargo stylus --version
```

## 🔧 Development

### Running the Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the app.

### Working with Stylus Contracts

```bash
# Build the contract
npm run contract:build

# Check contract is valid for Stylus
npm run contract:check

# Export ABI for frontend
npm run contract:export-abi
```

## 🚢 Deployment

### 1. Deploy Stylus Contract

```bash
# Set your private key (NEVER commit this!)
export PRIVATE_KEY=your_private_key_here

# Deploy to Arbitrum Sepolia testnet
npm run contract:deploy:sepolia

# Or deploy to Arbitrum mainnet
npm run contract:deploy:mainnet
```

After deployment, you'll receive a contract address. Update it in `src/config/contracts.ts`:

```typescript
export const CHOW_FAST_CONTRACT = {
  address: '0x7d9f801f94edf810b9156ce3033af75b6c01cee2', // Already deployed!
  abi: ChowFastOrderStylusABI.abi,
} as const;
```

**Note**: The contract is already deployed at the address above. You can use this deployment or deploy your own instance.

### 2. Initialize Contract

After deployment, you need to call the `init()` function on your contract to set the owner. You can do this using:

- Arbiscan (verify and interact)
- cast (Foundry tool)
- ethers.js script

### 3. Deploy Frontend

```bash
# Build the frontend
npm run build

# Deploy to your hosting provider
# The dist/ folder contains the production build
```

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# Reown Project ID (required for wallet connection)
VITE_REOWN_PROJECT_ID=your_project_id

# Contract address (update after deployment)
VITE_CONTRACT_ADDRESS=0x...
```

## 📝 Smart Contract Functions

The deployed contract exposes the following functions (exported as camelCase):

### User Functions

- `createOrder()` - Create and pay for a new food order (payable)
  - Accepts: product IDs, names, prices, quantities, subtotal, delivery info
  - Emits: `OrderCreated` event with full order details
  - Payment required: subtotal + 0.00001 ETH transaction fee
- `cancelOrder(orderId)` - Cancel order within 5 minutes (with refund)
- `getTotalOrders()` - Get total number of orders created

### Owner Functions

- `init()` - Initialize contract (sets owner) - **Already initialized**
- `updateOrderStatus(orderId, newStatus)` - Update order status
- `withdraw()` - Withdraw contract balance
- `transferOwnership(newOwner)` - Transfer contract ownership
- `owner()` - View current contract owner

### Events

- `OrderCreated` - Emitted when an order is created (contains all order data)
- `OrderStatusUpdated` - Emitted when order status changes
- `PaymentReceived` - Emitted when payment is received
- `FundsWithdrawn` - Emitted when owner withdraws funds

**Note**: The simplified Stylus contract uses events for data retrieval instead of storage mappings to stay under the 24 KB size limit while maintaining full functionality.

## 🧪 Testing

```bash
# Run frontend linting
npm run lint

# Test contract build
cd contracts/stylus
cargo test
```

## 📚 Migration Notes

This project was migrated from **fast-snack** (Solidity) to **chow-fast** (Stylus):

### Key Changes

1. **Smart Contracts**: Migrated from Solidity to Rust/Stylus
2. **Gas Efficiency**: Stylus provides 50-90% gas savings
3. **Contract Interface**: Adapted to work with Stylus SDK patterns
4. **Frontend Hooks**: Updated to work with Stylus contract signatures

### Benefits of Stylus

- **Lower Gas Costs**: Significantly cheaper transactions
- **Better Performance**: WASM execution is faster than EVM
- **Memory Safety**: Rust's safety guarantees
- **Full EVM Compatibility**: Works with existing Ethereum tools

## 🔗 Useful Links

### Deployed Contract

- [Contract on Arbiscan](https://sepolia.arbiscan.io/address/0x7d9f801f94edf810b9156ce3033af75b6c01cee2)
- [Deployment Transaction](https://sepolia.arbiscan.io/tx/0x65d1f7c73ddb0d9b22d2a111291c05e17eef7188676a55791b35d315d92a9673)
- [Contract Activation TX](https://sepolia.arbiscan.io/tx/0x53993114e30d04747c0f7e727b057f5a1cfca23cfd9ed623b8f516238c1241df)

### Development Resources

- [Arbitrum Stylus Documentation](https://docs.arbitrum.io/stylus/stylus-gentle-introduction)
- [Stylus SDK Rust Docs](https://docs.rs/stylus-sdk/latest/stylus_sdk/)
- [cargo-stylus GitHub](https://github.com/OffchainLabs/cargo-stylus)
- [Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
- [Reown Cloud](https://cloud.reown.com) (for WalletConnect Project ID)

## 🐛 Troubleshooting

### Contract Won't Build

- Ensure you have the latest Rust stable version
- Run `cargo clean` and rebuild
- Check Stylus SDK version compatibility

### Frontend Won't Connect to Wallet

- Verify VITE_REOWN_PROJECT_ID is set in .env
- Check that you're on Arbitrum Sepolia network (chain ID: 421614)
- Clear browser cache and reload

### Transactions Failing

- Ensure contract is initialized (init() was called)
- Check you have enough ETH for gas + transaction fee
- Verify contract address is correct in config/contracts.ts

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: This is a hackathon/educational project. The smart contracts have not been audited. Use at your own risk in production.
