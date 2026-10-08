// Builds the site into ./dist so every script your wallet page runs is served from YOUR domain:
//   1. copies your site files (index.html, images, ...) into dist/
//   2. copies ethers and the QR library from the pinned npm packages
//   3. bundles the Reown AppKit wallet popup into dist/appkit.bundle.js
// Steps 2 and 3 are "best effort": if one fails, the build still succeeds and the page falls
// back to its public-CDN backup, so a problem here can never take the site down.
import { build } from 'esbuild';
import { cpSync, rmSync, mkdirSync, readdirSync, existsSync, copyFileSync, readFileSync, statSync } from 'node:fs';

const SKIP = new Set([
  'node_modules', '.git', '.github', '.vercel', 'dist',
  'package.json', 'package-lock.json', 'build.js', 'build.mjs', 'appkit-entry.js', '.gitignore'
]);

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const name of readdirSync('.')) {
  if (SKIP.has(name)) continue;
  cpSync(name, 'dist/' + name, { recursive: true });
}
console.log('Site files copied to dist/: ' + readdirSync('dist').join(', '));

function copyFirst(label, candidates, dest) {
  for (const c of candidates) {
    if (existsSync(c)) {
      copyFileSync(c, dest);
      console.log('OK   ' + label + ' <- ' + c + ' (' + Math.round(statSync(dest).size / 1024) + ' KB)');
      return;
    }
  }
  console.warn('WARN ' + label + ' not found in node_modules; the page will use its CDN backup');
}
copyFirst('ethers', ['node_modules/ethers/dist/ethers.umd.min.js'], 'dist/ethers.umd.min.js');
copyFirst('qrcode', ['node_modules/qrcodejs/qrcode.min.js', 'node_modules/qrcodejs/qrcode.js'], 'dist/qrcode.js');

try {
  await build({
    entryPoints: ['appkit-entry.js'],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2020',
    minify: true,
    outfile: 'dist/appkit.bundle.js',
    define: { global: 'globalThis', 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning'
  });
  const out = readFileSync('dist/appkit.bundle.js', 'utf8');
  for (const needle of ['createAppKit', 'EthersAdapter']) {
    if (!out.includes(needle)) throw new Error('bundle is missing ' + needle);
  }
  console.log('OK   appkit.bundle.js (' + Math.round(statSync('dist/appkit.bundle.js').size / 1024) + ' KB)');
} catch (e) {
  rmSync('dist/appkit.bundle.js', { force: true });
  console.warn('WARN AppKit bundle failed (' + (e && e.message ? e.message.split('\n')[0] : e) + '); the page will use its CDN backup');
}
