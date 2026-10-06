# Flare Vault

**Your assets. Your privacy.** A non-custodial, browser-based wallet and inheritance tool for the [Flare Network](https://flare.network).

- **Website:** https://[OFFICIAL-DOMAIN]
- **X (Twitter):** https://x.com/flare_vault
- **Source code:** this repository
- **Security policy:** [SECURITY.md](./SECURITY.md)

> **Only use the official domain above.** Flare Vault will never DM you, ask for your recovery phrase in chat, or ask you to "verify" your wallet. Any other domain is not us.

---

## Overview

Flare Vault is a single-page, static web app (HTML + JavaScript). There is **no Flare Vault backend, server, or database**. Wallets are created and used entirely in your browser, and the app talks only to public Flare Network infrastructure.

Because the source is public and the app is a single file, anyone can read it, diff it against the deployed site, or run it locally.

## Features

| Feature | Description |
|---|---|
| Wallet creation | Generates a BIP-39 recovery phrase locally in your browser using [ethers.js](https://docs.ethers.org/v6/) |
| Wallet import | Import via recovery phrase or private key |
| Encrypted storage | Optional password-encrypted keystore stored in your browser (ethers encrypted JSON / scrypt) |
| Biometric unlock | Optional Face ID / passkey unlock using WebAuthn |
| Auto-lock | Locks after 5 minutes of inactivity |
| Send / receive | FLR, FXRP and USDT on Flare (chain ID 14) |
| Swap | Token swaps routed through SparkDEX V3 (see [Fees](#fees)) |
| Stake | Stake FXRP through the Firelight stXRP vault |
| Legacy Vault | Dead-man's-switch inheritance: set beneficiaries, check in periodically, funds become claimable if check-ins stop |
| History | Transaction history from the Flare block explorer |
| NFT waitlist | Optional sign-up for the 555 NFT collection |

## How it works

```
Your browser
 ├─ creates/imports wallet (ethers.js, runs locally)
 ├─ encrypts keystore with your password -> browser localStorage (optional)
 ├─ signs transactions locally
 └─ sends only SIGNED transactions + read queries to public Flare RPC nodes
```

Recovery phrases and private keys are **never** included in any network request made by the app. Signing happens locally; only the signed transaction is broadcast.

## Network requests

Everything the app can contact is listed here. None of these requests carry your recovery phrase, private key, or password.

| Destination | Purpose | Data sent |
|---|---|---|
| `flare-api.flare.network`, `rpc.ankr.com/flare`, `flare.drpc.org`, `flare.rpc.thirdweb.com` | Flare RPC: balances, quotes, broadcasting signed transactions | Public chain queries; your IP and public address are visible to the node |
| `flare-explorer.flare.network/api` | Transaction history | Your public address |
| `cdnjs.cloudflare.com` | Loads the ethers.js library (v6.13.4) | Standard browser request |
| `fonts.googleapis.com` | Loads the Manrope font | Standard browser request |
| `/_vercel/insights/script.js` | Vercel Web Analytics (page views) | Anonymous visit data, handled by Vercel |
| `api.qrserver.com` | Renders the QR code for your receive address | Your public address |
| `script.google.com` | NFT waitlist submission (only if you submit the form) | Wallet address, X handle, Telegram handle |

## Fees

- **Swaps:** a **0.25%** fee on the input amount is sent to the Flare Vault treasury in a separate transaction before the swap. The fee is shown in the swap screen before you confirm.
- **Network gas** is paid in FLR to the Flare Network, not to Flare Vault.
- Send, receive, and Legacy Vault actions carry no Flare Vault fee other than gas.

Treasury address: `0x8538Ab3a2A2d3E465060946c8D8c62BF0F8f9F8b`

## Contracts

All addresses are on Flare mainnet (chain ID 14). Verify each on the [Flare explorer](https://flare-explorer.flare.network).

| Contract | Address |
|---|---|
| Legacy Vault V2 (inheritance contract, current) | `0x78fEED9912944061519E975de51d60e1857D2d87` |
| Legacy Vault V1 (superseded, withdraw your funds) | `0x343AA2c49A03F55Ae610AD1aF33B0FF8C4169AA3` |
| SparkDEX V3 SwapRouter | `0x8a1E35F5c98C4E85B36B7B253222eE17773b2781` |
| SparkDEX V3 QuoterV2 | `0x5B5513c55fd06e2658010c121c37b07fC8e8B705` |
| Firelight stXRP vault | `0x4C18Ff3C89632c3Dd62E796c0aFA5c07c4c1B2b3` |
| Wrapped FLR (WFLR) | `0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d` |
| FXRP | `0xAd552A648C74D49E10027AB8a618A3ad4901c5bE` |
| USDT (bridged) | `0x0B38e83B86d491735fEaa0a791F65c2B99535396` |
| Flare contract registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` |

## Verify it yourself

You don't need to trust us. Here's how to check:

1. **Read the code.** The whole app is `index.html` in this repo. Search for `fetch(` and `localStorage` to see every network call and every piece of stored data.
2. **Watch the network.** Open your browser DevTools, go to the **Network** tab, then create a wallet and send a test transaction. Confirm no request contains your phrase or key.
3. **Compare to the deployed site.** Use "View Source" on the live site and diff it against this repo at commit `[COMMIT-HASH]`.
4. **Run it locally.** The safest option, with no hosting trust required:

```bash
git clone https://github.com/[USERNAME]/[REPO].git
cd [REPO]
# open index.html in your browser (ideally offline for wallet creation)
```

## Safe usage

- Test with a **small amount** first.
- **Write your recovery phrase on paper**, offline. Flare Vault cannot recover it for you.
- Never type your recovery phrase into any site you reached through a link in a message or reply.
- For significant holdings, use a hardware wallet.
- Always check the URL before entering anything.

## Deployment

The app is static. Deploy by serving `index.html` from any static host. The official deployment is on Vercel, built directly from this repository's `main` branch.

## Status and disclaimer

Flare Vault is **unaudited, early-stage software** provided "as is", without warranty. You are responsible for your keys and your funds. Smart contract and software risks apply, including the Legacy Vault contract. See [SECURITY.md](./SECURITY.md) for the full list of known limitations.

## License

[CHOOSE: MIT / Apache-2.0 / other]
