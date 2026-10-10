# Flare Vault: a privacy-first digital asset vault on Flare

**Your assets. Your control.** Flare Vault is non-custodial software for Flare Mainnet (chain ID 14). Connect your own wallet to see, send and receive FLR, FXRP, bridged USDT and NFTs, and optionally set up a Legacy Vault so the people you choose can claim your funds if you stop checking in. There is no account, email or password.

Open the app: https://www.flarevaultapp.xyz/ (connecting a wallet needs a web browser with JavaScript).

## What it is built for

- **Self-custody.** Your keys. Your assets.
- **Privacy first.** Your financial life stays private.
- **Automated inheritance.** Access for the people you choose.

## How Legacy Vault works

Four steps, no accounts, no middlemen. Everything happens between your wallet and a public smart contract on Flare.

1. **Connect.** Pick your wallet from the list. It opens, you approve, and you land back on the site. No email, no sign-up.
2. **Set the plan.** Add beneficiary addresses and give each a share. Shares must add up to 100%. Choose how often you will check in.
3. **Deposit.** Move FLR, FXRP or USDT into the Legacy Vault contract. You can withdraw any amount whenever you like.
4. **Check in.** A check-in transaction resets the timer. Miss the deadline and each beneficiary can claim their share from the contract.

> **Know the trade-off.** Funds you deposit are held by the Legacy Vault smart contract, not by your wallet. That is what lets beneficiaries claim without you, and it means you rely on that contract's code. Read it before you deposit.

## Safety: built so there is less to trust

**What Flare Vault sees**

- Your public wallet address and token balances, the same data anyone can read on the explorer.
- Nothing else. No account, no email, no password.

**What it can never do**

- Move your funds without you approving it in your wallet.
- Ask for your recovery phrase or private key.
- Create or import a wallet.

**Stay safe from copies**

1. Copies of crypto sites are common. Bookmark https://www.flarevaultapp.xyz/ and check the address bar before you connect.
2. Never type a recovery phrase into any website. If a page asks for one, close it.
3. Read every prompt in your wallet. Reject anything you did not start.

## Fees you can see before you confirm

| Action | Cost |
|---|---|
| Send | Network gas only. No fee from Flare Vault. |
| Swap | Pool fee tier plus network gas plus a 0.25% Flare Vault fee, taken from what you receive inside the same transaction. The full breakdown is shown before you confirm. |
| Stake FXRP (launching soon) | Through the Firelight stXRP vault. Network gas only. No fee from Flare Vault. |
| Legacy Vault | Deposits, check-ins and claims cost network gas only. No fee from Flare Vault. |

Supported assets: FLR, FXRP (XRP on Flare) and bridged USDT, plus ERC-721 and ERC-1155 NFTs on Flare.

## Trust: check the contracts yourself

Every contract Flare Vault uses is public. Open any of them on the Flare explorer.

| Contract | Role | Address |
|---|---|---|
| Legacy Vault V2 | Inheritance contract | [`0x78fEED9912944061519E975de51d60e1857D2d87`](https://flare-explorer.flare.network/address/0x78fEED9912944061519E975de51d60e1857D2d87) |
| SparkDEX V3 router | Executes swaps | [`0x8a1E35F5c98C4E85B36B7B253222eE17773b2781`](https://flare-explorer.flare.network/address/0x8a1E35F5c98C4E85B36B7B253222eE17773b2781) |
| Firelight stXRP vault | FXRP staking | [`0x4C18Ff3C89632c3Dd62E796c0aFA5c07c4c1B2b3`](https://flare-explorer.flare.network/address/0x4C18Ff3C89632c3Dd62E796c0aFA5c07c4c1B2b3) |
| FXRP | XRP on Flare | [`0xAd552A648C74D49E10027AB8a618A3ad4901c5bE`](https://flare-explorer.flare.network/address/0xAd552A648C74D49E10027AB8a618A3ad4901c5bE) |
| USDT | Bridged Tether | [`0x0B38e83B86d491735fEaa0a791F65c2B99535396`](https://flare-explorer.flare.network/address/0x0B38e83B86d491735fEaa0a791F65c2B99535396) |
| WFLR | Wrapped FLR, used inside swaps | [`0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d`](https://flare-explorer.flare.network/address/0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d) |

## The people behind Flare Vault

**Nico Vale**, Founder & CEO.

> **Independent audit.** No third-party audit has been published yet. The Legacy Vault source code is verified and public, so anyone can read exactly what it does on the explorer.

## Questions people ask first

**Do you hold my funds?** Not in your wallet. Flare Vault never has your keys. If you choose to use Legacy Vault, the funds you deposit are held by that smart contract until you withdraw them or your beneficiaries claim them.

**What if I lose my wallet?** Flare Vault cannot recover it. Only your wallet's own recovery phrase can. Funds you have placed in Legacy Vault are different: if you stop checking in, your beneficiaries can claim them after the interval ends.

**What if I forget to check in?** Once the interval has passed, your beneficiaries can claim their shares. Choose an interval you can reliably keep, and check in well before it ends.

**Can I change my beneficiaries?** Yes. You can update the plan, and withdraw your deposits, whenever you like while the vault is active.

**Which wallets work?** MetaMask, Trust Wallet, Coinbase Wallet and Rainbow, in your browser or on your phone. Any other wallet that supports WalletConnect also works.

**Which network does it use?** Flare Mainnet. If your wallet is on another network, Flare Vault asks it to switch.

**Can I check the contracts myself?** Yes. Every contract Flare Vault uses is public. You can open each one on the Flare explorer.

## Learn more

- [About Flare Vault](https://www.flarevaultapp.xyz/about)
- [Documentation](https://www.flarevaultapp.xyz/docs)
- [White Paper](https://www.flarevaultapp.xyz/whitepaper)
- [Privacy Policy](https://www.flarevaultapp.xyz/privacy)
- [Terms of Service](https://www.flarevaultapp.xyz/terms)
- [Contact](https://www.flarevaultapp.xyz/contact)

## Company information

Registered company: FLAREVAULT DIGITAL SPHERE LTD  
Registration number: RC 9921156  
Founder & CEO: Nico Vale

## Contact

Support and partnerships: support@flarevaultapp.xyz  
Security and abuse reports: report@flarevaultapp.xyz  
X: [@flare_vault](https://x.com/flare_vault)

---

Non-custodial software for Flare Mainnet.  
© 2026 FlareVault. All rights reserved.
