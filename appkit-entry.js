// Entry file for the self-hosted wallet popup. index.html loads /appkit.bundle.js
// and expects exactly these two exports.
export { createAppKit } from '@reown/appkit';
export { EthersAdapter } from '@reown/appkit-adapter-ethers';
