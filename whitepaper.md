# Flare Vault White Paper

A non-custodial approach to digital asset continuity on Flare.

Version 1.0 · 9 October 2026

## Abstract

Flare Vault is non-custodial software for Flare Mainnet (chain ID 14). It combines a wallet-connected interface for everyday asset management with Legacy Vault, a public smart contract that lets an owner name beneficiaries and a check-in interval, so assets can pass on without relying on a custodian, a lawyer’s copy of a key, or a company that must stay in business. This paper describes the problem, the design, the mechanisms, the security model, the fee model and the current status. Where a feature is not live, it is labelled as such.

## 1. The problem

Self-custody makes the owner the single point of failure. If keys are lost, or the owner becomes unavailable, the assets can become permanently unreachable, and the people who should inherit them often do not know that they exist or how to reach them. The common workarounds each have a weakness: sharing a recovery phrase hands over full control immediately; using a custodian reintroduces the counterparty risk that self-custody was meant to remove; and a written will is slow, discloses holdings, and cannot move on-chain assets by itself.

## 2. Design goals

- **Self-custody first.** The owner keeps control of assets in their own wallet. Nothing is deposited unless the owner chooses to.
- **Minimal disclosure.** No accounts, no personal data required, and no keys ever shared with the application.
- **Transparency.** Contract source is public and verifiable. Fees are shown before any transaction is signed.
- **Simplicity.** Four steps for inheritance planning: connect, set the plan, deposit, check in.
- **Honest status.** Features are described as live only when they run on mainnet.

## 3. System overview

Flare Vault has three layers. The interface is a website that runs in the user’s browser and has no application server of its own: it reads public data from the Flare blockchain through public RPC endpoints and the Flare explorer. The wallet, which belongs to the user, holds the keys and signs every transaction. The contracts on Flare Mainnet hold the rules and, for Legacy Vault, the deposited assets.

| Component | Role | Operated by |
|---|---|---|
| Website | Interface for balances, sending, NFTs and Legacy Vault | Flare Vault |
| User wallet | Holds keys, shows and signs every transaction | The user |
| Legacy Vault V2 | Stores plans and deposits, enforces check-in and claims | Flare Vault (public, verified source) |
| FXRP and bridged USDT | Supported tokens | Their issuers |
| SparkDEX V3, Firelight stXRP | Swapping (live) and staking (launching soon) | Third parties |

## 4. Self-custody model

Flare Vault never creates, imports or stores wallets, and never asks for a recovery phrase or private key. Connecting a wallet only lets the site read public information. Every action that moves assets is a transaction that the user reviews and signs in their own wallet. Where a token permission is needed, such as depositing a token into Legacy Vault, the application requests an approval for the exact amount being used, not an unlimited amount.

## 5. Legacy Vault: the inheritance mechanism

Legacy Vault V2 is a smart contract that serves many owners. For each owner it stores a plan and tracks deposits per asset.

1. **Set the plan.** The owner lists beneficiary addresses and a share for each, in basis points (100 basis points is 1%). Shares must total 10,000 (100%). The owner also chooses a check-in interval.
2. **Deposit.** The owner deposits FLR, FXRP or USDT into the contract. Balances are tracked separately for each owner and asset.
3. **Check in.** A check-in records the current time. The vault counts as expired once the interval has passed since the last check-in.
4. **Withdraw or update.** While the vault is active, the owner can withdraw assets, deposit more, check in again and change the plan.
5. **Claim.** After expiry, a listed beneficiary calls claim for the owner and a specific asset. The contract pays out according to the stored shares, and the exact amount settles on-chain.

The mechanism is purely time-based. It uses no oracle, no death certificate and no third party who must act, which keeps it simple and censorship-resistant. The consequence is that an owner who is unable to check in for any reason, such as illness or travel, allows the vault to expire, so the interval should be chosen with that in mind.

> **What is public.** Legacy Vault plans live on a public blockchain. Anyone who looks up an owner’s address on the explorer can read the beneficiary addresses, shares, check-in interval and last check-in time, as well as the vault’s balances. The plan does not reveal who the beneficiaries are as people, but the addresses are visible.

## 6. Assets and NFTs

Supported assets are FLR, FXRP (XRP on Flare) and bridged USDT on Flare Mainnet. The My NFTs screen lists ERC-721 and ERC-1155 NFTs held by the connected wallet and sends them. Before an NFT is sent, ownership is verified directly on-chain, and transfers to the sender’s own address or to the NFT’s own contract are blocked. NFT names and images are supplied by third parties, so they are shown as plain text and safe image links only, and links inside NFT metadata are never made clickable. NFTs are not stored in Legacy Vault.

## 7. Swapping and staking

Swaps run through SparkDEX V3 liquidity pools and are live. FXRP staking through the Firelight stXRP vault is launching soon. In both cases Flare Vault does not take custody: the transaction is built in the interface and signed by the user. The Flare Vault swap fee is taken from the amount you receive, inside the same transaction as the swap, so it applies only when the swap succeeds and is never a second prompt.

## 8. Security model

| Threat | How Flare Vault addresses it |
|---|---|
| Copycat or phishing sites | One official address, published here and on X; wallet prompts show what is being signed; security headers are enabled; users are told never to share a recovery phrase. |
| Key theft | The application never handles keys or recovery phrases. |
| Excessive token permissions | Approvals are for the exact amount used. |
| Hostile NFT metadata | Names are shown as plain text, images are limited to safe link types, and metadata links are not clickable. |
| Contract bugs | Source code for Legacy Vault V2 is verified and public. No third-party audit has been published yet. |
| Compromised third-party code or RPC | Libraries are version-pinned and the content security policy limits where scripts may load from. Hosting more code on the Flare Vault domain is a stated goal. |
| Owner unable to check in | The interval is chosen by the owner and a check-in can be made at any time before expiry. |

## 9. Privacy

No account or personal data is needed. The application reads public blockchain data about the connected address. The only personal details Flare Vault stores are those a visitor types into the optional waitlist form. The [Privacy Policy](https://www.flarevaultapp.xyz/privacy) lists the outside services involved and what stays on the device.

## 10. Fees and treasury

| Action | Cost |
|---|---|
| Send FLR, tokens and NFTs | Network gas only |
| Legacy Vault: deposit, check in, withdraw, claim | Network gas only |
| Stake FXRP (launching soon) | Network gas only |
| Swap | Pool fee, network gas and a 0.25% Flare Vault fee taken from what you receive, inside the same transaction |

The Flare Vault swap fee is paid to the public treasury address [0x008dfa020B48417cFA5c4ED95A2c572A11eD04D7](https://flare-explorer.flare.network/address/0x008dfa020B48417cFA5c4ED95A2c572A11eD04D7).

## 11. Status and roadmap

| Item | Status |
|---|---|
| Wallet connection, balances, history | Live |
| Send and receive FLR, FXRP, bridged USDT | Live |
| My NFTs: view, receive, send | Live |
| Legacy Vault V2 | Live on Flare Mainnet |
| Swap through SparkDEX V3 | Live |
| Stake FXRP through Firelight stXRP | Launching soon |
| FXRP as collateral | Coming soon |
| 555 NFT Collection | In development. 55 free guaranteed spots, first come first served; the remaining 500 mint at a fixed 3,000 FLR. Waitlist open; minting not yet open. |

## 12. Limitations and disclosures

- Legacy Vault V2 has not been through a published third-party security audit. Its verified source code can be read by anyone.
- Funds placed in any smart contract depend on that contract’s code, so only deposit amounts you are comfortable placing in it.
- The application relies on outside infrastructure such as the wallet-connection service, Flare RPC providers and the explorer.
- Features marked launching soon or coming soon are not yet available, and timing may change.
- This paper describes the product as of its date and may be updated. It is a description of software and not an offer or a promise of returns.

## 13. Company information

Registered company: FLAREVAULT DIGITAL SPHERE LTD Registration number: RC 9921156 Founder & CEO: Nico Vale

## 14. Contracts and references

**Legacy Vault V2** [0x78fEED9912944061519E975de51d60e1857D2d87](https://flare-explorer.flare.network/address/0x78fEED9912944061519E975de51d60e1857D2d87)

**FXRP (XRP on Flare)** [0xAd552A648C74D49E10027AB8a618A3ad4901c5bE](https://flare-explorer.flare.network/address/0xAd552A648C74D49E10027AB8a618A3ad4901c5bE)

**USDT (bridged)** [0x0B38e83B86d491735fEaa0a791F65c2B99535396](https://flare-explorer.flare.network/address/0x0B38e83B86d491735fEaa0a791F65c2B99535396)

See also the [documentation](https://www.flarevaultapp.xyz/docs), the [Privacy Policy](https://www.flarevaultapp.xyz/privacy) and the [contact page](https://www.flarevaultapp.xyz/contact). Security reports go to report@flarevaultapp.xyz.

[Open Flare Vault](https://www.flarevaultapp.xyz/)

---

HTML version: https://www.flarevaultapp.xyz/whitepaper  
Other pages: [Home](https://www.flarevaultapp.xyz/) · [About](https://www.flarevaultapp.xyz/about) · [Documentation](https://www.flarevaultapp.xyz/docs) · [White Paper](https://www.flarevaultapp.xyz/whitepaper) · [Privacy Policy](https://www.flarevaultapp.xyz/privacy) · [Terms of Service](https://www.flarevaultapp.xyz/terms) · [Contact](https://www.flarevaultapp.xyz/contact)  
© 2026 FlareVault. All rights reserved.
