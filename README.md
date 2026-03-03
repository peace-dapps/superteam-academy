# PumpSwap Market Maker Bot 🤖

A Node.js market maker bot for the PumpSwap AMM DEX on Solana. It monitors your token's pool price and automatically buys when price dips and sells when price rises within your configured spread.

## How it works

PumpSwap uses a **constant product AMM** (x × y = k), similar to Uniswap v2. The bot:

1. Finds your token's PumpSwap pool automatically
2. Monitors the price every few seconds
3. **Buys** when price falls below your target by `BUY_SPREAD %`
4. **Sells** when price rises above your target by `SELL_SPREAD %`
5. Adjusts the target price slightly after each trade to follow the market

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your .env

```bash
cp .env.example .env
```

Then edit `.env` and fill in:

| Variable | Description |
|---|---|
| `PRIVATE_KEY` | Your wallet's base58 private key |
| `TOKEN_MINT` | The mint address of your token |
| `RPC_URL` | Solana RPC endpoint (use Helius/QuickNode for reliability) |

### 3. Run the bot

```bash
npm start
```

## Configuration

| Variable | Default | Description |
|---|---|---|
| `BUY_SPREAD` | `0.02` | Buy when price drops 2% below target |
| `SELL_SPREAD` | `0.02` | Sell when price rises 2% above target |
| `TRADE_AMOUNT_SOL` | `0.01` | SOL amount per trade |
| `MAX_TOKEN_BALANCE` | `1000000` | Max tokens to hold at once |
| `SLIPPAGE` | `0.05` | Max slippage tolerance (5%) |
| `POLL_INTERVAL_MS` | `5000` | Price check interval (5 seconds) |
| `PRIORITY_FEE` | `100000` | Priority fee in microlamports |

## Example output

```
🚀 PumpSwap Market Maker Bot Starting...

✅ Config validated
✅ Wallet loaded: 7xKq...
✅ Connected to Solana (1.18.26)

📊 Config:
   Token:       EPjFWdd...
   Trade size:  0.01 SOL
   Buy spread:  2%
   Sell spread: 2%

🔍 Finding PumpSwap pool...
✅ Pool found at index 0: 5nmZb...

▶️  Starting market making loop...

⏱  2025-02-18T10:00:00.000Z
   Price:   0.0000001234 SOL/token
   Target:  0.0000001234 | Buy ≤ 0.0000001209 | Sell ≥ 0.0000001259
   Wallet:  0.5000 SOL | 0.00 tokens
   Stats:   0 buys, 0 sells, 0 errors
   ⏳ Price within spread — no action
```

## ⚠️ Important warnings

- **Start with small amounts** — test with `TRADE_AMOUNT_SOL=0.001` first
- **Use a dedicated wallet** — never use your main wallet
- **Get a good RPC** — public RPC is unreliable; use [Helius](https://helius.dev) or [QuickNode](https://quicknode.com)
- **Watch your inventory** — set `MAX_TOKEN_BALANCE` and `MAX_SOL_BALANCE` carefully
- **Trading involves risk** — you can lose money market making, especially on volatile memecoins

## RPC Providers (recommended)

- [Helius](https://helius.dev) — free tier available, great for bots
- [QuickNode](https://quicknode.com) — reliable, paid
- [Triton](https://triton.one) — high performance

## Stop the bot

Press `Ctrl+C` — the bot will print a summary before exiting.
