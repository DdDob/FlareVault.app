# Flare Vault Documentation

How Flare Vault works, where your funds go, what it can and cannot do, and where to check everything yourself.

Last updated: 9 October 2026

OverviewGetting startedWallets & networkSelf-custodyWhere funds goLegacy VaultNFTsFeesPrivacySecurityStatusContracts

## 1. Overview

Flare Vault is a non-custodial web app for Flare Mainnet (chain ID 14). You connect your own wallet to view balances and NFTs, send and receive FLR, FXRP and bridged USDT, and optionally use Legacy Vault, a smart contract that lets named beneficiaries claim funds you deposited if you stop checking in. There is no Flare Vault account. Your wallet is your login, and there is no sign-up.

## 2. Getting started

1. Open the website and tap **Connect Wallet**.
2. Choose your wallet from the list. It opens, you approve the connection, and you return to the site.
3. If your wallet is on another network, Flare Vault asks it to switch to Flare Mainnet. Approve the switch in your wallet.
4. Your balances, NFTs and history appear. Nothing is moved until you start a transaction and approve it.

## 3. Wallets and network

Supported wallets: MetaMask, Trust Wallet, Coinbase Wallet and Rainbow, in your browser or on your phone, plus any other wallet that supports WalletConnect. The only network is **Flare Mainnet**, chain ID 14, whose native token is FLR. Supported assets: FLR, FXRP (XRP on Flare), bridged USDT, and ERC-721 and ERC-1155 NFTs on Flare. You need a small amount of FLR to pay network gas for any transaction.

## 4. Self-custody

- Flare Vault never has your keys. It cannot move your funds without you approving the exact transaction in your own wallet.
- It does not create or import wallets, and it never asks for a recovery phrase or private key. If a page claiming to be Flare Vault asks for one, close it.
- When a transaction needs token permission, for example depositing into Legacy Vault, the app requests approval for the exact amount you are using, not an unlimited amount.
- Read every prompt in your wallet. Reject anything you did not start.

## 5. Where your funds go

| Action | What happens to your assets |
|---|---|
| Connect wallet | Nothing moves. The site reads public data about your address. |
| Send FLR, tokens or NFTs | They go directly from your wallet to the address you enter. Flare Vault does not touch them in between. |
| Receive | Assets sent to your address arrive in your own wallet. Only Flare-network assets should be sent to it. |
| Legacy Vault deposit | The FLR, FXRP or USDT you deposit moves into the Legacy Vault smart contract. You can withdraw any amount while the vault is active. |
| Swap (launching soon) | Executed through SparkDEX V3 liquidity pools. The result is sent to your wallet. |
| Stake FXRP (launching soon) | Deposited through the Firelight stXRP vault. Network gas applies. |

## 6. Legacy Vault (inheritance)

Legacy Vault V2 is a public smart contract on Flare. Everything happens between your wallet and that contract, with no accounts and no middlemen.

1. **Connect** your wallet.
2. **Set the plan.** Add beneficiary addresses and give each a share. Shares must add up to 100%. Choose how often you will check in, in days.
3. **Deposit.** Move FLR, FXRP or USDT into the contract. Deposits are separate from your main wallet balance.
4. **Check in.** A check-in transaction resets the timer. If the deadline passes without a check-in, each beneficiary can claim their share from the contract.

While the vault is active you can check in, update your beneficiaries, deposit more and withdraw. A beneficiary claims by entering the vault owner’s address on the Claim tab and confirming the transaction from their own wallet. Deposits, check-ins and claims cost network gas only. There is no Flare Vault fee.

> **The trade-off.** Funds you deposit are held by the Legacy Vault smart contract, not by your wallet. That is what lets beneficiaries claim without you, and it means you rely on that contract’s code. Choose a check-in interval you can reliably keep. If you lose your wallet, Flare Vault cannot recover it, but funds placed in Legacy Vault can still be claimed by your beneficiaries after the interval ends.

## 7. NFTs

My NFTs lists the ERC-721 and ERC-1155 NFTs in your wallet, loaded from the Flare explorer. NFTs can be received at your normal address. If one does not appear, you can add it by contract address and token ID, and the app confirms on the blockchain that you own it. Before any NFT is sent, ownership is checked again on-chain, and transfers to your own address or to the NFT’s own contract are blocked. NFT names and pictures are created by third parties, so treat unknown NFTs with care and never open links or connect to sites advertised inside them. Only NFTs on Flare are supported. Sending an NFT costs network gas only.

## 8. Fees

| Feature | Cost |
|---|---|
| Send FLR, tokens and NFTs | Network gas only. No Flare Vault fee. |
| Legacy Vault | Network gas only. No Flare Vault fee. |
| Stake FXRP (launching soon) | Network gas. No Flare Vault fee. |
| Swap (launching soon) | The pool’s own fee tier, plus network gas, plus a 0.25% Flare Vault fee. The full breakdown is shown before you confirm. |

The Flare Vault swap fee, once swaps launch, is paid to this public address: [0x008dfa020B48417cFA5c4ED95A2c572A11eD04D7](https://flare-explorer.flare.network/address/0x008dfa020B48417cFA5c4ED95A2c572A11eD04D7).

## 9. Privacy architecture

Public: your wallet address, balances, NFTs and transactions are on the blockchain and visible to anyone. Read by the app: your public address and the on-chain data above, processed in your browser. Stored on your device only: theme, last wallet type, a waitlist marker and NFTs you added by hand. Stored by us: only what you type into the optional waitlist form. Apart from that form, Flare Vault has no server-side database of users. See the [Privacy Policy](https://www.flarevaultapp.xyz/privacy) for the full detail.

## 10. Security

**Implemented protections:** no key handling; exact-amount approvals; transaction details shown in your wallet before you sign; on-chain ownership checks before sending NFTs; text and images from outside sources are displayed safely; HTTPS with a content security policy and other security headers; public, verified contract source.

**Known limitations:** no third-party security audit of the Legacy Vault contract has been published yet, so please read the verified source and deposit only what you are comfortable placing in a smart contract. The app depends on outside infrastructure, including the wallet-connection service, Flare RPC providers and the explorer. Always check the address bar before connecting your wallet.

**Reporting vulnerabilities:** email report@flarevaultapp.xyz with the subject *Security report*. See the [contact page](https://www.flarevaultapp.xyz/contact#contact-security).

## 11. Status of features

| Feature | Status |
|---|---|
| Wallet connection, balances, history | Live |
| Send and receive FLR, FXRP, bridged USDT | Live |
| My NFTs: view, receive, send | Live |
| Legacy Vault V2 (inheritance) | Live on Flare Mainnet |
| Swap through SparkDEX V3 | Launching soon |
| Stake FXRP through Firelight stXRP | Launching soon |
| FXRP as collateral | Coming soon |
| 555 NFT collection | In development, waitlist open |

## 12. Contracts and addresses

**Legacy Vault V2** [0x78fEED9912944061519E975de51d60e1857D2d87](https://flare-explorer.flare.network/address/0x78fEED9912944061519E975de51d60e1857D2d87)

**FXRP (XRP on Flare)** [0xAd552A648C74D49E10027AB8a618A3ad4901c5bE](https://flare-explorer.flare.network/address/0xAd552A648C74D49E10027AB8a618A3ad4901c5bE)

**USDT (bridged)** [0x0B38e83B86d491735fEaa0a791F65c2B99535396](https://flare-explorer.flare.network/address/0x0B38e83B86d491735fEaa0a791F65c2B99535396)

Open any of these on the Flare explorer to read the code, balances and transaction history yourself.

[Open Flare Vault](https://www.flarevaultapp.xyz/)

---

HTML version: https://www.flarevaultapp.xyz/docs  
Other pages: [Home](https://www.flarevaultapp.xyz/) · [About](https://www.flarevaultapp.xyz/about) · [Documentation](https://www.flarevaultapp.xyz/docs) · [White Paper](https://www.flarevaultapp.xyz/whitepaper) · [Privacy Policy](https://www.flarevaultapp.xyz/privacy) · [Contact](https://www.flarevaultapp.xyz/contact)  
© 2026 FlareVault. All rights reserved.
