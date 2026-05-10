# base-frame-tools

> Farcaster Frames Builder Toolkit for Base L2

Build powerful Farcaster Frames that interact directly with Base smart contracts. Mint NFTs, execute swaps, cast votes, and collect payments — all within a Farcaster Frame.

## Features
- 🖼️ Frame builder with visual editor
- ⛓️ On-chain actions (mint, swap, stake, vote)
- 💰 Payment frames (USDC / ETH on Base)
- 🗳️ Voting / poll frames
- 📊 Analytics per frame (clicks, mints, revenue)
- 🔗 Integrates with Zora, BasePaint, Coinbase Wallet

## Quick Start
```bash
git clone https://github.com/fabt31/base-frame-tools
cd base-frame-tools
npm install
npm run dev
```

## Create a Mint Frame
```typescript
import { createMintFrame } from "./src/frames";

const frame = createMintFrame({
  contractAddress: "0xYourNFTContract",
  chainId: 8453, // Base
  title: "Mint My NFT",
  image: "https://your-image.png",
  price: "0.001", // ETH
});

export default frame.handler;
```

## Frame Types
| Type | Description |
|------|-------------|
| `mint` | NFT minting frame |
| `swap` | Token swap via Uniswap |
| `vote` | On-chain governance vote |
| `tip` | ETH/USDC tip jar |
| `whitelist` | Whitelist signup |

## License
MIT