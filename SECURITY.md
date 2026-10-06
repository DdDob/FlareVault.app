# Security Policy

_Last updated: [DATE]_

Flare Vault is a non-custodial, client-side wallet. This document explains how keys are handled, what we do and don't protect against, every known limitation, and how to report a vulnerability. We would rather you know the risks than trust us blindly.

## 1. Summary

- No Flare Vault server or database exists. The app is a static page.
- Keys are generated, stored, and used in your browser. Recovery phrases, private keys, and passwords are never sent over the network by the app.
- The app has **not been formally audited**, and neither has our Legacy Vault smart contract.
- Browser wallets carry more risk than hardware wallets. Do not hold large amounts in one.

## 2. Architecture

| Component | Where it runs | Trust required |
|---|---|---|
| App code (`index.html`) | Your browser | Whoever controls the hosting and repository |
| Key generation and signing | Your browser (ethers.js v6.13.4) | ethers.js and your device |
| Blockchain reads/writes | Public Flare RPC nodes | Nodes can see your IP and public address; they cannot see keys |
| Legacy Vault | On-chain smart contract | Contract correctness (unaudited) |

## 3. Key handling

**Creation.** A BIP-39 recovery phrase is generated locally with `ethers.Wallet.createRandom()`, which uses the browser's cryptographically secure random source. The phrase is shown once and you must confirm you've saved it before continuing.

**Import.** You can import by recovery phrase or private key. Both are processed locally.

**Storage.**
- *With a password (recommended):* the wallet is encrypted using the standard ethers encrypted-JSON keystore (scrypt) and saved in your browser's `localStorage` (`flarevault_keystore_v1`). Minimum password length is 8 characters.
- *Without a password:* the wallet is held in memory for the session only and is lost on reload. You must keep your recovery phrase.

**Biometric (Face ID / passkey) unlock.** Optional. Uses WebAuthn with the PRF extension. A key derived from your device authenticator (HKDF, AES-GCM) encrypts your wallet password, and the ciphertext is stored in `localStorage` (`flarevault_passkey_v1`). The authenticator-derived key is never stored. Your password remains the real backup.

**Session protections.**
- Auto-lock after 5 minutes of inactivity.
- Escalating lockouts after repeated failed password or passkey attempts.
- Locking or clearing the wallet removes it from memory and storage as described in the app.

**Transactions.** Signed locally. Only the signed transaction is broadcast. Swaps and fees are shown on screen before you confirm.

## 4. Third-party services

The app makes requests to the services below. None receive recovery phrases, private keys, or passwords.

| Service | Purpose | What they can see |
|---|---|---|
| Flare RPC providers (Flare, Ankr, dRPC, thirdweb) | Chain reads, broadcasting | IP address, public address, transactions |
| Flare block explorer | History | Public address |
| cdnjs (Cloudflare) | Hosts ethers.js | Standard request metadata |
| Google Fonts | Font | Standard request metadata |
| Vercel Web Analytics | Anonymous page-view analytics | Visit metadata |
| qrserver.com | QR code image for the receive address | Public address |
| Google Apps Script / Sheets | NFT waitlist (only if you submit the form) | Wallet address, X handle, Telegram handle |

## 5. Fees and transparency

- Swaps charge a **0.25%** fee on the input token, sent to treasury `0x8538Ab3a2A2d3E465060946c8D8c62BF0F8f9F8b` in a separate transaction. The fee is displayed before confirmation.
- There are no hidden approvals, and token approvals are limited to the swap, staking, or vault action you start.
- The treasury wallet is also used to reveal an admin view in the UI. This is a **display convenience, not a security boundary**: it grants no on-chain privileges.

## 6. Known limitations and risks

We list these deliberately.

1. **Unaudited.** No third-party audit has been completed for the app or the Legacy Vault contract. Treat both as experimental.
2. **Hosting trust.** Whoever controls the repository and hosting can change the code your browser runs. Verify the deployed code against this repo, or run it locally.
3. **Third-party script.** ethers.js is loaded from a public CDN. A CDN compromise could affect the app. See the hardening roadmap.
4. **Browser threat surface.** Malware, malicious extensions, or cross-site scripting could read data a page handles. Browser storage is less isolated than a hardware wallet or dedicated app.
5. **Client-side lockouts are not cryptographic.** Failed-attempt limits don't stop someone who copies your encrypted keystore from guessing offline. **Use a strong, unique password.**
6. **Phrase exposure.** While the wallet is unlocked, the recovery phrase may be held in memory to support "Reveal recovery phrase". Copying a phrase to the clipboard exposes it to other apps.
7. **Legacy Vault.** A custom smart contract (V2, `0x78fEED9912944061519E975de51d60e1857D2d87`) that holds user funds. V2 fixes accounting and interval issues found in V1 (`0x343AA2c49A03F55Ae610AD1aF33B0FF8C4169AA3`), which is superseded. V2 has no admin keys, fees, or upgrade path, but it is **unaudited**; bugs could lead to loss. Check-in timing is your responsibility.
8. **Token risk.** Bridged USDT is marked unverified in the app. Always confirm token contracts.
9. **Waitlist data.** Submissions go to a Google Sheet via Apps Script. Don't submit data you aren't comfortable sharing.
10. **Analytics.** Vercel Web Analytics runs on the same origin as the app.

## 7. Hardening roadmap

Status: planned, not yet complete.

- [ ] Self-host ethers.js and fonts, and pin versions with Subresource Integrity (SRI)
- [ ] Generate receive QR codes locally instead of via a third-party API
- [ ] Add a strict Content-Security-Policy and security headers via `vercel.json`
- [ ] Clear the in-memory recovery phrase immediately after it is shown
- [ ] Remove analytics from wallet screens
- [ ] Verify all contract source code on the Flare explorer
- [ ] Independent community review of the app code
- [ ] Professional audit of the Legacy Vault contract
- [ ] Reproducible builds and signed commits/releases
- [ ] Bug bounty program

## 8. Reporting a vulnerability

Please report privately and give us reasonable time to fix issues before public disclosure.

- **Email:** [SECURITY-EMAIL]
- **GitHub:** Security tab, then "Report a vulnerability"
- We aim to acknowledge reports within **72 hours**.
- Include steps to reproduce, affected versions, and impact.

Good-faith research that avoids harming users or accessing others' funds will not be pursued.

**Never include real recovery phrases, private keys, or other users' data in a report.**

## 9. Official channels and phishing

- Website: https://[OFFICIAL-DOMAIN]
- X: https://x.com/flare_vault

We will **never** ask for your recovery phrase, private key, or password by DM, email, support chat, or any form. If someone does, it is a scam.

## 10. Disclaimer

Flare Vault is provided "as is" without warranties of any kind. You are solely responsible for safeguarding your keys and for transactions you sign.
