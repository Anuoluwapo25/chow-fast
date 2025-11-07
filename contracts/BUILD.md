# Stylus Contract Build & Deployment Guide

## 📦 Optimized Build Process

The contract requires aggressive size optimization to fit within Arbitrum Stylus limits.

### Step 1: Build with Cargo
```bash
cargo build --release --target wasm32-unknown-unknown
```

### Step 2: Optimize with wasm-opt
```bash
wasm-opt -Oz \
  --enable-bulk-memory \
  --enable-sign-ext \
  --strip-debug \
  --strip-producers \
  --dce \
  target/wasm32-unknown-unknown/release/stylus_hello_world.wasm \
  -o target/wasm32-unknown-unknown/release/stylus_hello_world_opt.wasm

# Replace original with optimized
cp target/wasm32-unknown-unknown/release/stylus_hello_world_opt.wasm \
   target/wasm32-unknown-unknown/release/stylus_hello_world.wasm
```

### Step 3: Verify Contract
```bash
cargo stylus check --endpoint https://sepolia-rollup.arbitrum.io/rpc
```

**Expected Output:**
- Uncompressed WASM: ~78 KiB
- Compressed (Brotli): ~27.8 KiB
- Status: ✅ Passes validation

## 🚀 Deployment

### Prerequisites
1. **Install wasm-opt** (if not installed):
   ```bash
   sudo apt-get install -y binaryen
   ```

2. **Get Testnet ETH**:
   - QuickNode Faucet: https://faucet.quicknode.com/arbitrum/sepolia
   - Alchemy Faucet: https://www.alchemy.com/faucets/arbitrum-sepolia
   - You'll need ~0.002 ETH for deployment + activation

### Deploy to Arbitrum Sepolia

**Option A: Using private key file (Recommended)**
```bash
# Create a file with your private key (without 0x prefix)
echo "your_private_key_here" > /tmp/key.txt
chmod 600 /tmp/key.txt

# Estimate gas
cargo stylus deploy \
  --endpoint https://sepolia-rollup.arbitrum.io/rpc \
  --private-key-path=/tmp/key.txt \
  --estimate-gas

# Deploy
cargo stylus deploy \
  --endpoint https://sepolia-rollup.arbitrum.io/rpc \
  --private-key-path=/tmp/key.txt

# Clean up
rm /tmp/key.txt
```

**Option B: Using private key directly (Less secure)**
```bash
cargo stylus deploy \
  --endpoint https://sepolia-rollup.arbitrum.io/rpc \
  --private-key YOUR_PRIVATE_KEY_WITH_0x
```

### Deployment Process
The deployment sends **2 transactions**:
1. **Deploy**: Uploads WASM contract code (~0.000140 ETH)
2. **Activate**: Activates contract on-chain (~14 million gas on testnet)

**Copy the contract address** from the output!

## 📝 Post-Deployment

### 1. Initialize the Contract
Call the `init()` function once to set the owner:
```bash
# Using cast (from Foundry)
cast send <CONTRACT_ADDRESS> "init()" \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc \
  --private-key YOUR_PRIVATE_KEY
```

### 2. Update Frontend
Edit `/src/config/contracts.ts`:
```typescript
export const CHOW_FAST_CONTRACT = {
  address: '0xYOUR_DEPLOYED_CONTRACT_ADDRESS',
  abi: ChowFastOrderABI.abi,
} as const;
```

### 3. Verify on Arbiscan
Visit: https://sepolia.arbiscan.io/address/<CONTRACT_ADDRESS>

Contracts deployed with `cargo-stylus` v0.5.0+ can be automatically verified.

## 🔧 Optimizations Applied

1. **Cargo.toml optimizations**:
   - `opt-level = "z"` (maximum size optimization)
   - `lto = true` (link-time optimization)
   - `strip = true` (remove debug symbols)
   - `codegen-units = 1` (better optimization)

2. **wasm-opt optimizations**:
   - `-Oz` flag (aggressive size optimization)
   - Dead code elimination
   - Debug info stripping
   - ~19% size reduction (98KB → 79KB uncompressed)

3. **Code optimizations**:
   - Shortened error messages
   - Removed `user_orders` tracking (can use events instead)
   - Minimal storage structure

## 📊 Contract Stats

- **Functions**: 13 public functions
- **Storage**: 14 mappings + 2 state variables
- **Events**: 4 events (OrderCreated, PaymentReceived, OrderStatusUpdated, FundsWithdrawn)
- **Transaction Fee**: 0.00001 ETH
- **Cancellation Window**: 5 minutes

## 🔍 Error Codes

Shortened error messages for size optimization:
- `E5`: Insufficient payment
- `E6`: Only owner
- `E7`: Order doesn't exist
- `E8`: Cannot update cancelled order
- `E9`: Item index out of bounds
- `E10`: No funds to withdraw
- `E11`: Only buyer can cancel
- `E12`: Can only cancel paid orders
- `E13`: Cancellation period expired
- `E14`: Invalid new owner address

## 🛠️ Development Commands

```bash
# Check contract
npm run contract:check

# Export ABI
npm run contract:export-abi

# Deploy to Sepolia
npm run contract:deploy:sepolia

# Full rebuild with optimization
cargo clean
cargo build --release --target wasm32-unknown-unknown
wasm-opt -Oz --enable-bulk-memory --enable-sign-ext --strip-debug --strip-producers --dce \
  target/wasm32-unknown-unknown/release/stylus_hello_world.wasm \
  -o target/wasm32-unknown-unknown/release/stylus_hello_world_opt.wasm
cp target/wasm32-unknown-unknown/release/stylus_hello_world_opt.wasm \
   target/wasm32-unknown-unknown/release/stylus_hello_world.wasm
```

## ⚠️ Important Notes

- Always use `wasm-opt` after building - it's required to meet size limits
- The contract must be initialized with `init()` before use
- Keep your private key secure - never commit it to version control
- Test thoroughly on Sepolia before deploying to mainnet
- The `contract::address()` deprecation warning can be ignored

## 🎯 Next Steps

1. Get Sepolia ETH from faucets
2. Deploy contract using commands above
3. Copy deployed contract address
4. Initialize contract by calling `init()`
5. Update frontend configuration
6. Test order creation on testnet
7. Deploy to Arbitrum One mainnet when ready
